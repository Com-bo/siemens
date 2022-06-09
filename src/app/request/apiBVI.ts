import { useGet, usePost } from '.';
import Config from '../config';
export const importDataSave = (data: object, type: number) => {
    let url = ""
    switch (type) {
        case 1://manual
            url = Config.Api.ImportManualDataSave
            break
        case 2://r2r
            url = Config.Api.ImportDataSave
            break;
        // case 3://h2r bvi
        //     url = Config.Api.ImportH2RTE
        //     break;
        case 4://H2RTE
            url = Config.Api.ImportH2RTE
            break;
        // case 5:
        //     break;
        // case 6:
        //     break;
        // case 7:
        //     break;
        default:
            url = Config.Api.ImportDataSave
            break;
    }
    return usePost(`${Config.Api.Base}${url}`, data, {
        autoLoading: true,
    });
};