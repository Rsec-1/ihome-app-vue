
## API 文档

为了在 Postman 中测试用户相关的操作，您需要配置以下请求：

1. **用户注册**
   - 方法：POST
   - URL: `http://localhost:5000/api/users/register`
   - Body (JSON):
     ```json
     {
       "username": "exampleUser",
       "password": "examplePassword",
       "email": "example@example.com",
       "nickname": "exampleNickname"
     }
     ```

2. **用户登录**
   - 方法：POST
   - URL: `http://localhost:5000/api/users/login`
   - Body (JSON):
     ```json
     {
       "username": "exampleUser",
       "password": "examplePassword"
     }
     ```

3. **更新用户信息**
   - 方法：PUT
   - URL: `http://localhost:5000/api/users/update`
   - Body (JSON):
     ```json
     {
       "userId": "用户的ObjectId",
       "email": "newEmail@example.com",
       "nickname": "newNickname"
     }
     ```

4. **更新用户密码**
   - 方法：PUT
   - URL: `http://localhost:5000/api/users/updatePassword`
   - Body (JSON):
     ```json
     {
       "userId": "用户的ObjectId",
       "oldPassword": "exampleOldPassword",
       "newPassword": "exampleNewPassword"
     }
     ```

5. **获取用户所有房子**
   - 方法：GET
   - URL: `http://localhost:5000/api/houses/user/{userId}`
   - 示例: `http://localhost:5000/api/houses/user/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

6. **添加房子**
   - 方法：POST
   - URL: `http://localhost:5000/api/houses/add`
   - Body (JSON):
     ```json
     {
       "userId": "用户的ObjectId",
       "name": "房子的名称",
       "address": "房子的地址"
     }
     ```

7. **删除房子**
   - 方法：DELETE
   - URL: `http://localhost:5000/api/houses/delete/{houseId}`
   - 示例: `http://localhost:5000/api/houses/delete/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

8. **更新房子**
   - 方法：PUT
   - URL: `http://localhost:5000/api/houses/update`
   - Body (JSON):
     ```json
     {
       "houseId": "房子的ObjectId",
       "name": "新的房子名称",
       "address": "新的房子地址"
     }
     ```
