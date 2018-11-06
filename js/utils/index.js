

let ajax = function (params, callback) {
    let url = params.url || '';
    let type = params.type || 'GET';
    let async = params.async || true;
    let data = params.data || null;

    let xhr = new XMLHttpRequest();

    xhr.onload = xhr.onreadystatechange = function () {
        let res = JSON.parse(xhr.responseText);
        if (this.readyState === 4 && this.status === 200) {
            callback(res);
        }
    };

    xhr.open(type, url, async);

    if (params.contentType) {
        xhr.setRequestHeader('Content-type', params.contentType);
    }

    xhr.send(data);
};

ajax();