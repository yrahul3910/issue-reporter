from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.pipeline import make_pipeline
import pickle


def load_data() -> tuple:
    """
    Loads the Reuters dataset.

    Returns:
        data: tuple, X_train, Y_train, X_test, Y_test in that order.
    """
    print('Loading data...', end='')
    with open('raw_text_dataset.pickle', 'rb') as f:
        data = pickle.load(f)

    print('done!')
    return data


def vectorize_data(data) -> tuple:
    """
    Performs tf-idf vectorization on data and SVD on the vectors.

    Args:
        data: A tuple, X_train, Y_train, X_test, Y_test in that order.

    Returns:
        Tuple (X_train_lsa, X_test_lsa, pipeline): Normalized LSA vectors
            and Pipeline object to transform future documents
    """
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
    print('Obtaining tf-idf vectors...', end='')
    vectorizer = TfidfVectorizer(max_df=0.6, max_features=50000,
                                 min_df=3, stop_words=stop_words)

    X_train_tfidf = vectorizer.fit_transform(data[0])

    # Perform SVD, keeping 100 dimensions
    print('done!\nPerforming SVD...', end='')
    svd = TruncatedSVD(100)
    X_train_svd = svd.fit_transform(X_train_tfidf)
    print('done!')
    print('Explained variance:', svd.explained_variance_ratio_)

    # Normalize the vectors using L2 norm in-place
    print('Normalizing vectors...', end='')
    normalizer = Normalizer(copy=False)
    X_train_lsa = normalizer.fit_transform(X_train_svd)
    print('done!')

    # Create a pipeline for test data
    pipeline = make_pipeline(vectorizer, svd, normalizer)

    # Perform the same transformations on test data
    X_test_lsa = pipeline.transform(data[2])

    return X_train_lsa, X_test_lsa, pipeline
