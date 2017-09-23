/* eslint-disable no-undef */
let send = (token, d1, d2) => {
    $.ajax({
        url: "https://api.dandelion.eu/datatxt/sim/v1",
        type: "GET",
        data: {
            text1: d1,
            text2: d2,
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
