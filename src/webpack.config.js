const Config={
    'Config':JSON.stringify(process.env.NODE_ENV==='production'?{
        BaseUrl:"185.189.120.190:2535"
    }:{
        BaseUrl:"192.168.1.44:2535"

    })
}
module.exports=Config;
