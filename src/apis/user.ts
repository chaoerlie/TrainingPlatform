import httpRequest from '/src/request/index'

// 定义接口的传参
interface UserInfoParam {
    userID: string,
    userName: string
}

// 获取用户信息
export function apiGetUserInfo(param: UserInfoParam) {
    console.log(123)
    // console.log(this.$userInfo.test)
    return httpRequest({
        url: 'api/v1/user/login',
        method: 'post',
        data: param,
    })
}
export function convertC2E(param:String)
{
    if(param=='老师')
    {
        return 'ROLE_TEACHER'
    }
    if(param=='管理员')
    {
        return 'ROLE_ADMIN'
    }
    if(param=='工程师')
    {
        return 'ROLE_ENGINEER'
    }
    if(param=='组长')
    {
        return 'ROLE_MANAGER'
    }
    return 'ROLE_STUDENT'


}
export function convertE2C(param:String)
{
    if(param=='ROLE_TEACHER')
    {
        return '老师'
    }
    if(param=='ROLE_ADMIN')
    {
        return '管理员'
    }
    if(param=='ROLE_ENGINEER')
    {
        return '工程师'
    }
    if(param=='ROLE_MANAGER')
    {
        return '组长'
    }
    return '学生'

}
export function convertE2CForStatus(param:String){
    if(param=='CREATED'){
        return '已创建'
    }
    if(param=='APPROVED'){
        return '已通过'
    }
    if(param=='DENIED'){
        return'已驳回'
    }
}

export function convertE2CForSubmit(param:String){
    if(param=='UNSUBMITTED'){
        return '未提交'
    }
    if(param=='SUBMITTED'){
        return '已提交'
    }
    if(param=='OVERDUE'){
        return'超时未交'
    }
    if(param=='EVALUATED'){
        return'已评估'
    }
}