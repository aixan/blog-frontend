import {request} from "@@/exports";

export async function sendRegisterSms(phone: string) {
    return request<BaseResponse<number>>('/front/sms/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: phone,
    });
}
