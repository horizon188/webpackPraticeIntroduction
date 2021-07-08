import request from "@/utils/request";

const getSpeTypeList = function () {
  return request({
    url: `/users/getCity?id=1`,
    method: "GET",
  });
};

const addMenu = function (params) {
  return request({
    url: `/users/menu/add`,
    method: "post",
    data:params
  });
};
const deleteMenu = function (params) {
  return request({
    url: `/users/menu/delete`,
    method: "delete",
    data:params
  });
};

export default { getSpeTypeList ,addMenu,deleteMenu};
