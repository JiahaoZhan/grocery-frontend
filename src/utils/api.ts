import network from './network';


export function loginAPI(data) {
  return network({
    url: `/token`,
    method: "post",
    data
  });
}

export function registerAPI(data) {
  return network({
    url: `/users`,
    method: "post",
    data
  });
}

export function refreshAPI(data) {
  return network({
    url: "/token/refresh",
    method: "post",
    data
  });
}

export function createListAPI(data) {
  return network({
    url: `/lists`,
    method: "post",
    data
  });
}

export function getListAPI(data) {
  return network({
    url: `/lists`,
    method: "get",
    data
  });
}

export function changeListAPI(data) {
  console.log(data.pk)
  return network({
    url: `/lists/${data.pk}`,
    method: "put",
    data
  });
}

export function deleteListAPI(data) {
  return network({
    url: `/lists/${data.pk}`,
    method: "delete",
  });
}

export function createProductAPI(data) {
  return network({
    url: `/products`,
    method: "post",
    data
  });
}

export function changeProductAPI(data) {
  return network({
    url: `/products/${data.pk}`,
    method: "put",
    data
  });
}

export function getProductAPI(data) {
  return network({
    url: `/products`,
    method: "get",
    data
  });
}

export function deleteProductAPI(data) {
  return network({
    url: `/products/${data.pk}`,
    method: "delete",
  });
}

export function getSharedListAPI(data) {
  return network({
    url: `/share/${data.access_token}`,
    method: "get"
  })
}

export function getAllSharedListAPI() {
  return network({
    url: '/share',
    method: "get"
  })
}

export function deleteSharedListAPI(data) {
  return network({
    url: `/share`,
    method: 'delete',
    data,
  })
}

export function shareListAPI(data) {
  return network({
    url: "/share",
    method: "post",
    data
  })
}

