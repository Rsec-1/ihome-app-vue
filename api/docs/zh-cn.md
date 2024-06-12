## iHome API 文档

为了在 Postman/Hoppscotch 中测试 iHome 后端相关的操作，您需要配置以下请求：

### 用户模型

1. **用户注册**

   - **URL**: `/api/users/register`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "username": "your_username",
       "password": "your_password",
       "email": "your_email@example.com",
       "nickname": "your_nickname",
       "role": "user" // or "admin"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "User registered successfully",
       "token": "your_jwt_token",
       "data": {
         "userId": "user_id"
       }
     }
     ```

2. **用户登录**

   - **URL**: `/api/users/login`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "User logged in successfully",
       "token": "your_jwt_token"
     }
     ```

3. **更新用户信息**

   - **URL**: `/api/users/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "userId": "user_id",
       "email": "new_email@example.com",
       "nickname": "new_nickname"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "User information updated successfully",
       "data": {
         "userId": "user_id",
         "email": "new_email@example.com",
         "nickname": "new_nickname"
       }
     }
     ```

4. **更新用户密码**

   - **URL**: `/api/users/updatePassword`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "userId": "user_id",
       "oldPassword": "old_password",
       "newPassword": "new_password"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Password updated successfully"
     }
     ```

5. **删除用户**

   - **URL**: `/api/users/delete/:userId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "User deleted successfully"
     }
     ```

6. **获取所有用户**

   - **URL**: `/api/users/all`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "data": [
         {
           "userId": "user_id",
           "username": "username",
           "email": "email@example.com",
           "nickname": "nickname"
         }
       ]
     }
     ```

7. **忘记密码**

   - **URL**: `/api/users/forgot-password`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "usernameOrEmail": "your_username_or_email"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Password reset code sent to email"
     }
     ```

8. **重置密码**

   - **URL**: `/api/users/reset-password`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "usernameOrEmail": "your_username_or_email",
       "resetToken": "reset_token",
       "newPassword": "new_password"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Password reset successfully"
     }
     ```

### 房子模型

1. **获取用户所有房子**

   - **URL**: `/api/houses/user/:userId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "houses": [
         {
           "houseId": "house_id",
           "name": "house_name",
           "address": "house_address"
         }
       ]
     }
     ```

2. **添加房子**

   - **URL**: `/api/houses/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "userId": "user_id",
       "name": "house_name",
       "address": "house_address"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "House added successfully",
       "house": {
         "houseId": "house_id",
         "name": "house_name",
         "address": "house_address"
       }
     }
     ```

3. **更新房子**

   - **URL**: `/api/houses/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "houseId": "house_id",
       "name": "new_house_name",
       "address": "new_house_address"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "House updated successfully",
       "house": {
         "houseId": "house_id",
         "name": "new_house_name",
         "address": "new_house_address"
       }
     }
     ```

4. **删除房子**

   - **URL**: `/api/houses/delete/:houseId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "House deleted successfully"
     }
     ```

### 房间模型

1. **获取房子的所有房间**

   - **URL**: `/api/rooms/house/:houseId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "rooms": [
         {
           "roomId": "room_id",
           "name": "room_name"
         }
       ]
     }
     ```

2. **添加房间**

   - **URL**: `/api/rooms/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "houseId": "house_id",
       "name": "room_name"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Room added successfully",
       "room": {
         "roomId": "room_id",
         "name": "room_name"
       }
     }
     ```

3. **更新房间**

   - **URL**: `/api/rooms/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "roomId": "room_id",
       "name": "new_room_name"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Room updated successfully",
       "room": {
         "roomId": "room_id",
         "name": "new_room_name"
       }
     }
     ```

4. **删除房间**

   - **URL**: `/api/rooms/delete/:roomId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Room deleted successfully"
     }
     ```

### 设备模型

1. **获取房间所有设备**

   - **URL**: `/api/devices/room/:roomId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "devices": [
         {
           "deviceId": "device_id",
           "name": "device_name",
           "type": "device_type",
           "brand
     ```

": "device_brand",
"status": "online" // or "offline"
}
]
}
```

2. **添加设备**

   - **URL**: `/api/devices/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "roomId": "room_id",
       "name": "device_name",
       "type": "device_type",
       "brand": "device_brand",
       "status": "online" // or "offline",
       "location": "device_location"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Device added successfully",
       "device": {
         "deviceId": "device_id",
         "name": "device_name",
         "type": "device_type",
         "brand": "device_brand",
         "status": "online" // or "offline",
         "location": "device_location"
       }
     }
     ```

3. **更新设备**

   - **URL**: `/api/devices/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "deviceId": "device_id",
       "name": "new_device_name",
       "type": "new_device_type",
       "brand": "new_device_brand",
       "status": "online" // or "offline",
       "location": "new_device_location"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Device updated successfully",
       "device": {
         "deviceId": "device_id",
         "name": "new_device_name",
         "type": "new_device_type",
         "brand": "new_device_brand",
         "status": "online" // or "offline",
         "location": "new_device_location"
       }
     }
     ```

4. **删除设备**

   - **URL**: `/api/devices/delete/:deviceId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Device deleted successfully"
     }
     ```

5. **获取设备详情**

   - **URL**: `/api/devices/details/:deviceId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "device": {
         "deviceId": "device_id",
         "name": "device_name",
         "type": "device_type",
         "brand": "device_brand",
         "status": "online" // or "offline",
         "location": "device_location"
       }
     }
     ```

6. **远程控制设备**

   - **URL**: `/api/devices/control`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "deviceId": "device_id",
       "action": "turn_on" // or "turn_off"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Device controlled successfully",
       "device": {
         "deviceId": "device_id",
         "name": "device_name",
         "status": "online" // or "offline"
       }
     }
     ```

### 场景模型

1. **获取用户所有场景**

   - **URL**: `/api/scenes/user/:userId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "scenes": [
         {
           "sceneId": "scene_id",
           "name": "scene_name",
           "conditions": [
             {
               "type": "condition_type",
               "params": "condition_params"
             }
           ],
           "actions": [
             {
               "deviceId": "device_id",
               "command": "command",
               "params": "command_params"
             }
           ]
         }
       ]
     }
     ```

2. **添加场景**

   - **URL**: `/api/scenes/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "userId": "user_id",
       "name": "scene_name",
       "conditions": [
         {
           "type": "condition_type",
           "params": "condition_params"
         }
       ],
       "actions": [
         {
           "deviceId": "device_id",
           "command": "command",
           "params": "command_params"
         }
       ]
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Scene added successfully",
       "scene": {
         "sceneId": "scene_id",
         "name": "scene_name",
         "conditions": [
           {
             "type": "condition_type",
             "params": "condition_params"
           }
         ],
         "actions": [
           {
             "deviceId": "device_id",
             "command": "command",
             "params": "command_params"
           }
         ]
       }
     }
     ```

3. **更新场景**

   - **URL**: `/api/scenes/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Request Body**:
     ```json
     {
       "sceneId": "scene_id",
       "name": "new_scene_name",
       "conditions": [
         {
           "type": "new_condition_type",
           "params": "new_condition_params"
         }
       ],
       "actions": [
         {
           "deviceId": "device_id",
           "command": "new_command",
           "params": "new_command_params"
         }
       ]
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Scene updated successfully",
       "scene": {
         "sceneId": "scene_id",
         "name": "new_scene_name",
         "conditions": [
           {
             "type": "new_condition_type",
             "params": "new_condition_params"
           }
         ],
         "actions": [
           {
             "deviceId": "device_id",
             "command": "new_command",
             "params": "new_command_params"
           }
         ]
       }
     }
     ```

4. **删除场景**

   - **URL**: `/api/scenes/delete/:sceneId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Scene deleted successfully"
     }
     ```

通过上述文档，您可以在 Postman/Hoppscotch 中进行 iHome API 的各项操作。
