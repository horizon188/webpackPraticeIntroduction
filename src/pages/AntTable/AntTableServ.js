import request from "@/utils/request";

const getSpeTypeList = function () {
  return request({
    url: `/users/getCity?id=1`,
    method: "GET",
  });
};

export default { getSpeTypeList };
