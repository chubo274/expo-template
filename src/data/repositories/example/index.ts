/**
 * Always store token in session storage for faster retrieve
 * @type {{token: string}}
 */

import ApiGateway from "src/data/api";
import { ResourceType } from "src/data/api/interceptor/Interceptor";
import { urls } from "src/data/api/resourse";
import { ResponseModel } from "src/model/common";

export const getDataExampleRepo = async (): Promise<ResponseModel<any>> => {
  const resource = urls.coins;

  const apiGateway = new ApiGateway({
    method: "GET",
    resource,
    resourceType: ResourceType.Public,
  });

  return apiGateway.execute().then(async (response) => {
    return response;
  });
};
