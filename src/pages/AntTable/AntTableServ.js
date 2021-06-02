import request from "@/utils/request";

const getSpeTypeList = function () {
  return request({
    url: `https://www.fastmock.site/mock/b87730ac20af260a41d152999a07a969/api/api/footerMenu/list`,
    method: "GET",
  });
};

export default { getSpeTypeList };
