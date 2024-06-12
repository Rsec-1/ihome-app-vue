## iHome API 文档

为了在 Postman/Hoppscotch 中测试 iHome 后端相关的操作，您需要配置以下请求：
根据提供的模型，我将检查并更新每个文档请求和响应的内容格式，以确保与模型定义一致。

### 用户模型

1. **用户注册**

   - **URL**: `/api/users/register`
   - **Method**: `POST`
   - **请求示例**:
     ```json
     {
       "username": "your_username",
       "password": "your_password",
       "email": "your_email@example.com",
       "nickname": "your_nickname",
       "role": "user" // or "admin"
     }
     ```
   - **请求参数说明**:
     - `username` (string): 用户名，最少3个字符
     - `password` (string): 密码，最少6个字符
     - `email` (string): 有效的邮箱地址
     - `nickname` (string): 昵称（可选）
     - `role` (string): 用户角色，默认值为 `user`，可选值为 `user` 或 `admin`
   - **响应示例**:
     - **成功** (`201 Created`):
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
     - **用户名已存在** (`400 Bad Request`):
       ```json
       {
         "success": false,
         "message": "Username already exists"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

2. **用户登录**

   - **URL**: `/api/users/login`
   - **Method**: `POST`
   - **请求示例**:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
   - **请求参数说明**:
     - `username` (string): 用户名
     - `password` (string): 密码
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "User logged in successfully",
         "token": "your_jwt_token"
       }
       ```
     - **凭据无效** (`400 Bad Request`):
       
       ```json
       {
         "success": false,
         "message": "Invalid credentials"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

3. **更新用户信息**

   - **URL**: `/api/users/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     
     ```json
     {
       "userId": "user_id",
       "email": "new_email@example.com",
       "nickname": "new_nickname"
     }
     ```
   - **请求参数说明**:
     - `userId` (string): 用户ID
     - `email` (string): 新的邮箱（可选）
     - `nickname` (string): 新的昵称（可选）
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "User information updated successfully",
         "data": {
           "_id": "user_id",
           "email": "new_email@example.com",
           "nickname": "new_nickname"
         }
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

4. **更新用户密码**

   - **URL**: `/api/users/updatePassword`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     ```json
     {
       "userId": "user_id",
       "oldPassword": "old_password",
       "newPassword": "new_password"
     }
     ```
   - **请求参数说明**:
     - `userId` (string): 用户ID
     - `oldPassword` (string): 旧密码
     - `newPassword` (string): 新密码
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Password updated successfully"
       }
       ```
     - **旧密码错误** (`400 Bad Request`):
       ```json
       {
         "success": false,
         "message": "Old password is incorrect"
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

5. **删除用户**

   - **URL**: `/api/users/delete/:userId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "User deleted successfully"
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

6. **获取所有用户**

   - **URL**: `/api/users/all`
   - **Method**: `GET`
   - **Headers**:
     
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     
     - **成功** (`200 OK`):
       
       ```json
       {
         "success": true,
         "data": [
           {
             "_id": "user_id",
             "username": "username",
             "password": "your_password",
             "email": "email@example.com",
             "nickname": "nickname",
             "houses": [],
             "role": "user",
             "createdAt": "created_date" // ISO 8601 标准格式
           },
           // ... other users
         ]
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

7. **忘记密码**

   - **URL**: `/api/users/forgot-password`
   - **Method**: `POST`
   - **请求示例**:
     ```json
     {
       "usernameOrEmail": "your_username_or_email"
     }
     ```
   - **请求参数说明**:
     - `usernameOrEmail` (string): 用户名或邮箱
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Password reset code sent to email"
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **邮箱未提供** (`400 Bad Request`):
       ```json
       {
         "success": false,
         "message": "Email not provided, cannot reset password"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

8. **重置密码**

   - **URL**: `/api/users/reset-password`
   - **Method**: `POST`
   - **请求示例**:
     ```json
     {
       "usernameOrEmail": "your_username_or_email",
       "resetToken": "reset_token",
       "newPassword": "new_password"
     }
     ```
   - **请求参数说明**:
     - `usernameOrEmail` (string): 用户名或邮箱
     - `resetToken` (string): 重置密码令牌
     - `newPassword` (string): 新密码
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Password reset successfully"
       }
       ```
     - **无效令牌或令牌过期** (`400 Bad Request`):
       ```json
       {
         "success": false,
         "message": "Invalid token or token expired"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

9. **获取当前用户详细信息**

   - **URL**: `/api/users/me`
   - **Method

**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "data": {
           "_id": "user_id",
           "username": "username",
           "email": "user@mail.com",
           "nickname": "nickname",
           "houses": [],
           "role": "user",
           "createdAt": "created_date"
         }
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

### 房子模型

1. **获取用户所有房子**

   - **URL**: `/api/houses/user/:userId`
   - **Method**: `GET`
   - **Headers**:
     
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     
     - **成功** (`200 OK`):
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
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

2. **添加房子**

   - **URL**: `/api/houses/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     ```json
     {
       "name": "house_name",
       "address": "house_address"
     }
     ```
   - **请求参数说明**:
     - `name` (string): 房子名称
     - `address` (string): 房子地址
   - **响应示例**:
     - **成功** (`201 Created`):
       ```json
       {
         "success": true,
         "message": "House added successfully",
         "house": {
           "userId": "user_id",
           "name": "house_name",
           "address": "house_address",
           "rooms": [],
           "_id": "house_id",
           "createdAt": "created_date",
           "__v": 0
         }
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

3. **更新房子**

   - **URL**: `/api/houses/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     ```json
     {
       "houseId": "house_id",
       "name": "new_house_name",
       "address": "new_house_address"
     }
     ```
   - **请求参数说明**:
     - `houseId` (string): 房子ID
     - `name` (string): 新的房子名称
     - `address` (string): 新的房子地址
   - **响应示例**:
     - **成功** (`200 OK`):
       
       ```json
       {
         "success": true,
         "message": "House updated successfully",
         "house": {
           "_id": "house_id",
           "userId": "user_id",
           "name": "new_house_name",
           "address": "new_house_address",
           "rooms": [],
           "createdAt": "created_date"
         }
       }
       ```
     - **房子未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "House not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

4. **删除房子**

   - **URL**: `/api/houses/delete/:houseId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "House deleted successfully"
       }
       ```
     - **房子未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "House not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

### 房间模型

1. **获取房子的所有房间**

   - **URL**: `/api/rooms/house/:houseId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     
     - **成功** (`200 OK`):
       
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
     - **房子未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "House not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

2. **添加房间**

   - **URL**: `/api/rooms/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     ```json
     {
       "houseId": "house_id",
       "name": "room_name"
     }
     ```
   - **请求参数说明**:
     - `houseId` (string): 房子ID
     - `name` (string): 房间名称
   - **响应示例**:
     - **成功** (`201 Created`):
       ```json
       {
         "success": true,
         "message": "Room added successfully",
         "room": {
           "houseId": "house_id",
           "name": "room_name",
           "devices": [],
           "_id": "room_id",
           "createdAt": "created_date"
         }
       }
       ```
     - **房子未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "House not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

3. **更新房间**

   - **URL**: `/api/rooms/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     ```json
     {
       "roomId": "room_id",
       "name": "new_room_name"
     }
     ```
   - **请求参数说明**:
     - `roomId` (string): 房间ID
     - `name` (string): 新的房间名称
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Room updated successfully",
         "room": {
           "roomId": "room_id",
           "name": "new_room_name"
           "_id": "room_id",
           "houseId": "house_id",
           "name": "new_room_name",
           "devices": [],
           "createdAt": "created_date"
         }
       }
       ```
     - **房间未找到** (`404 Not Found`):
       
       ```json
       {
         "success": false,
         "message": "Room not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

4. **删除房间**

   - **URL**: `/api/rooms/delete/:roomId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Room deleted successfully"
       }
       ```
     - **房间未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Room not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

### 设备模型

1. **获取房间所有设备**

   - **URL**: `/api/devices/room/:roomId`

   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       
       ```json
       {
         "success": true,
         "devices": [
           {
             "_id": "device_id",
             "roomId": "room_id",
             "name": "device_name",
             "type": "device_type",
             "brand": "device_brand",
             "status": "online" // or "offline"
             "location": "device_location",
             "createdAt": "created_date"
           }
         ]
       }
       ```
     - **房间未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Room not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

2. **添加设备**

   - **URL**: `/api/devices/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     ```json
     {
       "roomId": "room_id",
       "name": "device_name",
       "type": "device_type",
       "brand": "device_brand",
       "status": "online", // or "offline"
       "location": "device_location"
     }
     ```
   - **请求参数说明**:
     - `roomId` (string): 房间ID
     - `name` (string): 设备名称
     - `type` (string): 设备类型
     - `brand` (string): 设备品牌
     - `status` (string): 设备状态（`online` 或 `offline`）
     - `location` (string): 设备位置
   - **响应示例**:
     - **成功** (`201 Created`):
       ```json
       {
         "success": true,
         "message": "Device added successfully",
         "device": {
           "roomId": "room_id",
           "name": "device_name",
           "type": "device_type",
           "brand": "device_brand",
           "status": "offline",
           "location": "device_location",
           "_id": "device_id",
           "createdAt": "created_date"
         }
       }
       ```
     - **房间未找到** (`404 Not Found`):
       
       ```json
       {
         "success": false,
         "message": "Room not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

3. **更新设备**

   - **URL**: `/api/devices/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     
     ```json
     {
       "deviceId": "device_id",
       "name": "new_device_name",
       "type": "new_device_type",
       "brand": "new_device_brand",
       "status": "online", // or "offline"
       "location": "new_device_location"
     }
     ```
   - **请求参数说明**:
     
     - `deviceId` (string): 设备ID
     - `name` (string): 新的设备名称
     - `type` (string): 新的设备类型
     - `brand` (string): 新的设备品牌
     - `status` (string): 新的设备状态（`online` 或 `offline`）
     - `location` (string): 新的设备位置
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Device updated successfully",
         "device": {
           "_id": "device_id",
           "roomId": "room_id",
           "name": "new_device_name",
           "type": "new_device_type",
           "brand": "new_device_brand",
           "status": "online", // or "offline"
           "location": "new_device_location",
           "createdAt": "created_date",
         }
       }
       ```
     - **设备未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Device not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

4. **删除设备**

   - **URL**: `/api/devices/delete/:deviceId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Device deleted successfully"
       }
       ```
     - **设备未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Device not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

5. **获取设备详情**

   - **URL**: `/api/devices/details/:deviceId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       
       ```json
       {
         "success": true,
         "device": {
           "_id": "device_id",
           "roomId": "room_id",
           "name": "device_name",
           "type": "device_type",
           "brand": "device_brand",
           "status": "online",
           "location": "device_location",
           "createdAt": "created_data",
         }
       }
       ```
     - **设备未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Device not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

6. **远程控制设备**

   - **URL**: `/api/devices/control`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     
     ```json
     {
       "deviceId": "device_id",
       "action": "turn_on" // or "turn_off"
     }
     ```
   - **请求参数说明**:
     - `deviceId` (string): 设备ID
     - `action` (string): 控制指令（`turn_on` 或 `turn_off`）
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Device controlled successfully",
         "device": {
           "_id": "device_id",
           "roomId": "room_id",
           "name": "device_name",
           "type": "device_type",
           "brand": "device_brand",
           "status": "online",
           "location": "device_location",
           "createdAt": "created_data",
         }
       }
       ```
     - **设备未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Device not found"
       }
       ```
     - **无效的操作** (`400 Bad Request`):
       ```json
       {
         "success": false,
         "message": "Invalid action"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

### 场景模型

1. **获取用户所有场景**

   - **URL**: `/api/scenes/user/:userId`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     
     - **成功** (`200 OK`):
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
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

2. **添加场景**

   - **URL**: `/api/scenes/add`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
     
     ```json
     {
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

   - **请求参数说明**:
     
     - `name` (string): 场景名称
     - `conditions` (array): 条件数组，每个条件包含 `type` 和 `params`
     - `actions` (array): 动作数组，每个动作包含 `deviceId`、`command` 和 `params`
   - **响应示例**:
     - **成功** (`201 Created`):
       ```json
       {
         "success": true,
         "message": "Scene added successfully",
         "scene": {
           "_id": "scene_id",
           "name": "scene_name",
           "conditions": [
             {
               "type": "condition_type",
               "params": "condition_params",
               "_id": "conditions_id"
             }
           ],
           "actions": [
             {
               "deviceId": "device_id",
               "command": "command",
               "params": "command_params",
               "_id": "actions_id"
             }
           ]
         }
       }
       ```
     - **用户未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "User not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

3. **更新场景**

   - **URL**: `/api/scenes/update`
   - **Method**: `PUT`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **请求示例**:
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
   - **请求参数说明**:
     - `sceneId` (string): 场景ID
     - `name` (string): 新的场景名称
     - `conditions` (array): 新的条件数组，每个条件包含 `type` 和 `params`
     - `actions` (array): 新的动作数组，每个动作包含 `deviceId`、`command` 和 `params`
   - **响应示例**:
     - **成功** (`200 OK`):
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
     - **场景未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Scene not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```

4. **删除场景**

   - **URL**: `/api/scenes/delete/:sceneId`
   - **Method**: `DELETE`
   - **Headers**:
     - `Authorization: Bearer your_jwt_token`
   - **响应示例**:
     - **成功** (`200 OK`):
       ```json
       {
         "success": true,
         "message": "Scene deleted successfully"
       }
       ```
     - **场景未找到** (`404 Not Found`):
       ```json
       {
         "success": false,
         "message": "Scene not found"
       }
       ```
     - **服务器内部错误** (`500 Internal Server Error`):
       ```json
       {
         "success": false,
         "message": "Internal server error"
       }
       ```
       

通过上述文档，您可以在 Postman/Hoppscotch 中进行 iHome API 的各项操作。
