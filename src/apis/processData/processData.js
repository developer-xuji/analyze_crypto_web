const processData = (param, method) => {
  return fetch("http://localhost:8080/histories" + param, {
    method: method,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
};

export default processData;
