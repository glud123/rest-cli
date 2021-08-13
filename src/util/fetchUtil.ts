import Message from "@/components/Message";

export const get = (url: string, data: any) => {
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  }).then((response) => response.json()); // parses response to JSON
};

/**
 * doc: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 *
 * 基于 fetch 的网络请求
 *
 * @param url {string} 不需要拼接的 cts
 * @param data {any}
 * @returns Promise<any>
 */
export const post = (url: string, data: any = {}) => {
  let formData = "";
  Object.keys(data).forEach((key, index) => {
    if (index === 0) {
      formData += `${key}=${data[key]}`;
    } else {
      formData += `&${key}=${data[key]}`;
    }
  });
  return fetch(`/cts/${url}`, {
    // body: JSON.stringify(data),
    body: formData,
    credentials: "include", // include, same-origin, *omit
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      // "content-type": "application/json;charset=UTF-8",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
  })
    .then((response) => response.json())
    .then(({ code, ...data }) => {
      if (code === "200") {
        return data;
      } else {
        throw new Error(data.msg);
      }
    })
    .catch((error) => {
      Message.error(error.message);
    }); // parses response to JSON
};

export const upload = (url: string, data: { [k: string]: any }) => {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
};
