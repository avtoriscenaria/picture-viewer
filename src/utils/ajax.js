

const ajax = async (api, data) => {

    return await fetch(getURL(api, data), {})
        .then(res => res.json())
        .then( res => ({ok: !res.error, data: res.error ? undefined : res}))
        .catch((e) => {
            return {ok: false, status: "unreachable"}
        });
};

const getURL = (api, data) => {
    let url = api.uri;
    for (const param in data) {
        url = `${url}&${param}=${data[param]}`
    }

    return url;
};


export default ajax;