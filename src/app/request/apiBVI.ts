import { useGet, usePost } from '.';
import Config from '../config';
export const importDataSave = (data: object, type: number) => {
    let url = ""
    switch (type) {
        case 1:
            url = Config.Api.ImportManualDataSave
            break
        case 2:
            url = Config.Api.ImportDataSave
            break;
        // case 3:
        //     break;
        // case 4:
        //     break;
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