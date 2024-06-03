
## Home System API 文档

为了在 Postman 中测试后端相关相关的操作，您需要配置以下请求：

### 用户模型

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

4. **删除用户**
   - 方法：DELETE
   - URL: `http://localhost:5000/api/users/delete/{userId}`
   - 示例: `http://localhost:5000/api/users/delete/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

通过这些步骤，你可以在 Postman 中测试删除用户的功能。

### 房子模型

1. **获取用户所有房子**
   - 方法：GET
   - URL: `http://localhost:5000/api/houses/user/{userId}`
   - 示例: `http://localhost:5000/api/houses/user/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

2. **添加房子**
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

3. **删除房子**
   - 方法：DELETE
   - URL: `http://localhost:5000/api/houses/delete/{houseId}`
   - 示例: `http://localhost:5000/api/houses/delete/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

4. **更新房子**
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

### 房间模型

1. **添加房间**
   - 方法：POST
   - URL: `http://localhost:5000/api/rooms/add`
   - Body (JSON):
     ```json
     {
       "houseId": "房子的ObjectId",
       "name": "房间的名称"
     }
     ```

2. **删除房间**
   - 方法：DELETE
   - URL: `http://localhost:5000/api/rooms/delete/{roomId}`
   - 示例: `http://localhost:5000/api/rooms/delete/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

3. **更新房间**
   - 方法：PUT
   - URL: `http://localhost:5000/api/rooms/update`
   - Body (JSON):
     ```json
     {
       "roomId": "房间的ObjectId",
       "name": "新的房间名称"
     }
     ```

4. **获取房子的所有房间**
   - 方法：GET
   - URL: `http://localhost:5000/api/rooms/house/{houseId}`
   - 示例: `http://localhost:5000/api/rooms/house/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

### 设备模型

1. **添加设备**
   - 方法：POST
   - URL: `http://localhost:5000/api/devices/add`
   - Body (JSON):
     ```json
     {
       "roomId": "房间的ObjectId",
       "name": "设备名称",
       "type": "设备类型",
       "brand": "设备品牌",
       "icon": "设备图标URL",
       "location": "设备所在位置"
     }
     ```

2. **删除设备**
   - 方法：DELETE
   - URL: `http://localhost:5000/api/devices/delete/{deviceId}`
   - 示例: `http://localhost:5000/api/devices/delete/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

3. **更新设备**
   - 方法：PUT
   - URL: `http://localhost:5000/api/devices/update`
   - Body (JSON):
     ```json
     {
       "deviceId": "设备的ObjectId",
       "name": "新的设备名称",
       "type": "新的设备类型",
       "brand": "新的设备品牌",
       "icon": "新的设备图标URL",
       "status": "online 或 offline",
       "location": "新的设备所在位置"
     }
     ```

4. **获取房间所有设备**
   - 方法：GET
   - URL: `http://localhost:5000/api/devices/room/{roomId}`
   - 示例: `http://localhost:5000/api/devices/room/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

5. **获取设备详情**
   - 方法：GET
   - URL: `http://localhost:5000/api/devices/details/{deviceId}`
   - 示例: `http://localhost:5000/api/devices/details/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

6. **远程控制设备**
   - 方法：POST
   - URL: `http://localhost:5000/api/devices/control`
   - Body (JSON):
     ```json
     {
       "deviceId": "设备的ObjectId",
       "action": "turn_on 或 turn_off"
     }
     ```

#### 场景模型 (`scene.ts`)

要实现自动化场景设置功能，后端需要进行一些扩展。自动化场景通常包括触发条件（如传感器输入、时间、状态变化等）和执行动作（如打开灯、调节温度等）。

1. **添加场景**
   - 方法：POST
   - URL: `http://localhost:5000/api/scenes/add`
   - Body (JSON):
     ```json
     {
       "userId": "用户的ObjectId",
       "name": "场景名称",
       "conditions": [
         {
           "type": "time",
           "params": { "hour": 6, "minute": 0 }
         }
       ],
       "actions": [
         {
           "deviceId": "设备的ObjectId",
           "command": "turn_on",
           "params": {}
         }
       ]
     }
     ```

2. **删除场景**
   - 方法：DELETE
   - URL: `http://localhost:5000/api/scenes/delete/{sceneId}`
   - 示例: `http://localhost:5000/api/scenes/delete/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

3. **更新场景**
   - 方法：PUT
   - URL: `http://localhost:5000/api/scenes/update`
   - Body (JSON):
     ```json
     {
       "sceneId": "场景的ObjectId",
       "name": "新的场景名称",
       "conditions": [
         {
           "type": "time",
           "params": { "hour": 6, "minute": 0 }
         }
       ],
       "actions": [
         {
           "deviceId": "设备的ObjectId",
           "command": "turn_on",
           "params": {}
         }
       ]
     }
     ```

4. **获取用户所有场景**
   - 方法：GET
   - URL: `http://localhost:5000/api/scenes/user/{userId}`
   - 示例: `http://localhost:5000/api/scenes/user/60d2c6b60c5d2c7f1c8e2b7b`
   - 无需 Body

通过这些设置，你可以在 Postman 中测试场景的添加、删除、更新和获取操作，确保后端功能正常工作。
