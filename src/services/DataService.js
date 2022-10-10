import httpCommon from "../http-common";
import httpCommonFile from "@/http-common-file";

class DataService {
    getAll()
    {
      return  httpCommon.get(`/property/list`);
    }
    get(id)
    {
      return  httpCommon.get(`/property/get/${id}`);
    }
    create(data)
    {
      return  httpCommonFile.post(`/property/create`,data);
    }
    update(id,data)
    {
      return  httpCommonFile.post(`/property/update/${id}`,data);
    }
    delete(id)
    {
      return  httpCommon.delete(`/property/delete/${id}`);
    }

    search(search)
    {
      return  httpCommon.get(`/property/find/${search}`);
    }

    propertyType()
    {
      return  httpCommon.get(`/property/type/list`);
    }
}

export default new DataService()