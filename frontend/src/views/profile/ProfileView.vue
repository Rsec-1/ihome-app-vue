<template>
  <div class="profile-container">
    <div class="profile-info">
      <h2>User Profile</h2>
      <p><strong>Nickname:</strong> {{ userStore.nickname }}</p>
      <p><strong>Username:</strong> {{ userStore.username }}</p>
      <p><strong>Email:</strong> {{ userStore.email }}</p>
      <p><strong>Role:</strong> {{ userStore.role }}</p>
      <p><strong>Created At:</strong> {{ userStore.createdAt }}</p>
      <div v-if="userStore.houses.length">
        <h3>Houses:</h3>
        <ul>
          <li v-for="(house, index) in userStore.houses" :key="house._id" @click="selectHouse(house)">
            <p><strong>House Name:</strong> {{ house.name }}</p>
            <p><strong>Address:</strong> {{ house.address }}</p>
            <p><strong>House ID:</strong> {{ house._id }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="actions">
      <van-button type="primary" @click="showEditNicknameDialog = true">Edit Nickname</van-button>
      <van-button type="warning" @click="showChangePasswordDialog = true">Change Password</van-button>
      <van-button type="danger" @click="showDeleteAccountDialog = true">Delete Account</van-button>
      <van-button type="danger" @click="logout">Logout</van-button>
      <van-button type="primary" @click="showAddHouseDialog = true">Add House</van-button>
    </div>

    <!-- Edit Nickname Dialog -->
    <van-dialog v-model:show="showEditNicknameDialog" title="Edit Nickname">
      <van-field v-model="newNickname" placeholder="New Nickname" />
      <template #footer>
        <van-button type="primary" block @click="editNickname">Save</van-button>
      </template>
    </van-dialog>

    <!-- Change Password Dialog -->
    <van-dialog v-model:show="showChangePasswordDialog" title="Change Password">
      <van-field v-model="oldPassword" type="password" placeholder="Old Password" />
      <van-field v-model="newPassword" type="password" placeholder="New Password" />
      <van-field v-model="confirmNewPassword" type="password" placeholder="Confirm New Password" />
      <template #footer>
        <van-button type="primary" block @click="changePassword">Change</van-button>
      </template>
    </van-dialog>

    <!-- Delete Account Dialog -->
    <van-dialog v-model:show="showDeleteAccountDialog" title="Delete Account" show-cancel-button
      @confirm="deleteAccount">
      Are you sure you want to delete your account? This action cannot be undone.
    </van-dialog>

    <!-- Add House Dialog -->
    <van-dialog v-model:show="showAddHouseDialog" title="Add House">
      <van-field v-model="newHouseName" placeholder="House Name" />
      <van-field v-model="newHouseAddress" placeholder="House Address" />
      <template #footer>
        <van-button type="primary" block @click="addHouse">Add</van-button>
      </template>
    </van-dialog>

    <!-- Update House Dialog -->
    <van-dialog v-model:show="showUpdateHouseDialog" title="Update House">
      <van-field v-model="selectedHouse.name" placeholder="House Name" />
      <van-field v-model="selectedHouse.address" placeholder="House Address" />
      <template #footer>
        <div style="display: flex; gap: 10px;">
          <van-button type="primary" block @click="updateHouse">Update</van-button>
          <van-button type="danger" block @click="confirmDeleteHouse">Delete</van-button>
        </div>
      </template>
    </van-dialog>

    <!-- Delete House Dialog -->
    <van-dialog v-model:show="showDeleteHouseDialog" title="Delete House" show-cancel-button @confirm="deleteHouse">
      Are you sure you want to delete this house? This action cannot be undone.
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import apiClient from '@/utils/axios';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();

interface House {
  _id: string;
  userId: string;
  name: string;
  address: string;
  rooms: any[];
  createdAt: string;
  __v: number;
}

const showEditNicknameDialog = ref(false);
const showChangePasswordDialog = ref(false);
const showDeleteAccountDialog = ref(false);
const showAddHouseDialog = ref(false);
const showUpdateHouseDialog = ref(false);
const showDeleteHouseDialog = ref(false);

const newNickname = ref(userStore.nickname);
const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const newHouseName = ref('');
const newHouseAddress = ref('');

const selectedHouse = ref<House>({ _id: '', name: '', address: '', userId: '', rooms: [], createdAt: '', __v: 0 });

const editNickname = async () => {
  try {
    await apiClient.put('/api/users/update', {
      userId: userStore.userId,
      nickname: newNickname.value,
    });
    userStore.setUserDetails({
      ...userStore.$state,
      nickname: newNickname.value,
    });
    showSuccessToast('Nickname updated successfully');
    showEditNicknameDialog.value = false;
  } catch (error) {
    console.error('Failed to update nickname', error);
    showFailToast('Failed to update nickname');
  }
};

const changePassword = async () => {
  if (newPassword.value !== confirmNewPassword.value) {
    showFailToast('New passwords do not match');
    return;
  }

  try {
    await apiClient.put('/api/users/updatePassword', {
      userId: userStore.userId,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    showSuccessToast('Password changed successfully');
    showChangePasswordDialog.value = false;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      showFailToast('Old password is incorrect');
    } else {
      console.error('Failed to change password', error);
      showFailToast('Failed to change password');
    }
  }
};

const deleteAccount = async () => {
  try {
    await apiClient.delete(`/api/users/delete/${userStore.userId}`);
    userStore.clearUserData();
    showSuccessToast('Account deleted successfully');
    router.push('/');
  } catch (error) {
    console.error('Failed to delete account', error);
    showFailToast('Failed to delete account');
  }
};

const logout = () => {
  userStore.clearUserData();
  router.push('/login');
};

const fetchHouses = async () => {
  try {
    const response = await apiClient.get(`/api/houses/user/${userStore.userId}`);
    userStore.setUserDetails({
      ...userStore.$state,
      houses: response.data.houses,
    });
  } catch (error) {
    console.error('Failed to fetch houses', error);
    showFailToast('Failed to fetch houses');
  }
};

const addHouse = async () => {
  try {
    const response = await apiClient.post('/api/houses/add', {
      name: newHouseName.value,
      address: newHouseAddress.value,
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      }
    });
    userStore.setUserDetails({
      ...userStore.$state,
      houses: [...userStore.houses, response.data.house],
    });
    showSuccessToast('House added successfully');
    showAddHouseDialog.value = false;
  } catch (error) {
    console.error('Failed to add house', error);
    showFailToast('Failed to add house');
  }
};

const selectHouse = (house: House) => {
  selectedHouse.value = { ...house };
  showUpdateHouseDialog.value = true;
};

const updateHouse = async () => {
  try {
    await apiClient.put('/api/houses/update', {
      houseId: selectedHouse.value._id,
      name: selectedHouse.value.name,
      address: selectedHouse.value.address,
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      }
    });
    showSuccessToast('House updated successfully');
    showUpdateHouseDialog.value = false;
    await fetchHouses();  // 重新获取房子列表
  } catch (error) {
    console.error('Failed to update house', error);
    showFailToast('Failed to update house');
  }
};

const confirmDeleteHouse = () => {
  showDeleteHouseDialog.value = true;
};

const deleteHouse = async () => {
  try {
    await apiClient.delete(`/api/houses/delete/${selectedHouse.value._id}`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      }
    });
    userStore.setUserDetails({
      ...userStore.$state,
      houses: userStore.houses.filter((h: House) => h._id !== selectedHouse.value._id),
    });
    showSuccessToast('House deleted successfully');
    showDeleteHouseDialog.value = false;
    showUpdateHouseDialog.value = false; // Close update dialog if delete is confirmed
  } catch (error) {
    console.error('Failed to delete house', error);
    showFailToast('Failed to delete house');
  }
};

onMounted(() => {
  fetchHouses();
});
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-info p {
  margin: 5px 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
