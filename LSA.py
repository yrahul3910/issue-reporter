from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.pipeline import make_pipeline
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import numpy as np


class LSA:
    """
    Implements Latent Semantic Analysis.
    """
    def __init__(self, verbose=False):
        """
        Initializes the LSA object.

        Args:
            verb: Boolean. If True, prints debug information.
        """
        self.verbose = verbose
        self.data = self.load_data()

        if self.verbose:
            print('Initialization complete.')

    def load_data(self) -> tuple:
        """
        Loads the Reuters dataset.

        Returns:
            data: tuple, X_train, Y_train, X_test, Y_test in that order.
        """
        if self.verbose:
            print('Loading data...', end='')

        with open('raw_text_dataset.pickle', 'rb') as f:
            data = pickle.load(f)

        if self.verbose:
            print('done!')

        return data

    def vectorize_data(self, data=None, dimensions=100) -> tuple:
        """
        Performs tf-idf vectorization on data and SVD on the vectors.

        Args:
            data: A tuple, X_train, Y_train, X_test, Y_test in that order.
                  If None, uses internally loaded data.
            dimensions: An integer. This is the dimensionality that SVD
                    will reduce the vectors to.

        Returns:
            Tuple (X_train_lsa, X_test_lsa, pipeline): Normalized LSA vectors
                and Pipeline object to transform future documents
        """
        if data is None:
            data = self.data

        stop_words = stopwords.words('english')

        # TfidfVectorizer parameters:
        #  - strip out stop words from the NLTK corpus
        #  - filter out terms that occur in more than 60% of the documents
        #    (max_df = 0.6)
        #  - filter out terms that occur in less than 3 documents
        #    (min_df = 3)
        #  - select the 50k most frequently words in the corpus
        #    (max_features = 50000)
        #  - normalizes the tf-idf vectors to length 1, using L2 norm.
        if self.verbose:
            print('Obtaining tf-idf vectors...', end='')

        vectorizer = TfidfVectorizer(max_df=0.6, max_features=50000,
                                     min_df=3, stop_words=stop_words)

        X_train_tfidf = vectorizer.fit_transform(data[0])

        # Perform SVD, keeping 100 dimensions
        if self.verbose:
            print('done!\nPerforming SVD...', end='')

        svd = TruncatedSVD(100)
        X_train_svd = svd.fit_transform(X_train_tfidf)

        if self.verbose:
            print('done!')
            print('Explained variance:', svd.explained_variance_ratio_)

        # Normalize the vectors using L2 norm in-place
        if self.verbose:
            print('Normalizing vectors...', end='')

        normalizer = Normalizer(copy=False)
        X_train_lsa = normalizer.fit_transform(X_train_svd)

        if self.verbose:
            print('done!')

        # Create a pipeline for test data
        pipeline = make_pipeline(vectorizer, svd, normalizer)
        self.pipeline = pipeline

        # Perform the same transformations on test data
        X_test_lsa = pipeline.transform(data[2])

        return X_train_lsa, X_test_lsa, pipeline

    def transform(self, vec, pipeline=None) -> list:
        """
        Uses the trained pipeline to transform a new vector.

        Args:
            pipeline: A sklearn Pipeline object with trained objects.
                      If None, uses the trained pipeline internally.
            vec: The vector to transform

        Returns:
            tfidf: Normalized tf-idf vector
        """
        if pipeline is None:
            pipeline = self.pipeline

        return pipeline.transform(vec)

    def cosine_similarity(self, vec1, vec2) -> float:
        """
        Returns the cosine similarity of two vectors.

        Args:
            vec1, vec2: The two vectors

        Returns:
            similarity: The cosine similarity of the two vectors.
        """
        v1 = np.array(vec1[:])
        v2 = np.array(vec2[:])

        if len(v1.shape) == 1:
            v1 = v1.reshape(-1, 1)
        if len(v2.shape) == 1:
            v2 = v2.reshape(-1, 1)

        result = cosine_similarity(vec1, vec2)
        return result[0][0]
