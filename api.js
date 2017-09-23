/* eslint-disable no-undef */
let send = (token) => {
    $.ajax({
        url: "https://api.dandelion.eu/datatxt/sim/v1",
        type: "GET",
        data: {
            text1: "Test sentence",
            text2: "Another test sentence",
            token
        },
        success: (res) => {
            return {
                success: true,
                similarity: res.similarity
            };
        },
        error: (res) => {
            return {
                success: false,
                message: res
            };
        }
    });
};

export default send;
