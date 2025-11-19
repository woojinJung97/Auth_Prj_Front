<template>
  <v-container fluid class="profile-container">
    <v-row class="profile-row" justify="start" align="start">
      <v-col cols="12" md="8" lg="6" class="profile-col">
        <v-card class="profile-card" elevation="6">
          <v-card-title class="card-title">
            <div>
              <h2>내 정보</h2>
              <div class="muted">이메일 · 비밀번호 · 닉네임을 수정할 수 있습니다</div>
            </div>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-form ref="formRef" v-model="valid" lazy-validation>
              <v-row>
                <!-- EMAIL -->
                <v-col cols="12">
                  <div class="field-row">
                    <div class="field-meta">
                      <label class="field-label">이메일</label>
                      <v-text-field
                        v-model="form.email"
                        :disabled="!editing.email"
                        :rules="editing.email ? [rules.required, rules.email] : []"
                        dense
                        hide-details
                        rounded
                        prepend-inner-icon="mdi-email"
                      />
                    </div>

                    <div class="field-action">
                      <v-btn text small :color="editing.email ? 'secondary' : 'primary'" @click="toggleEdit('email')">
                        {{ editing.email ? '취소' : '수정' }}
                      </v-btn>
                    </div>
                  </div>
                </v-col>

                <!-- PASSWORD -->
                <v-col cols="12">
                  <div class="field-row">
                    <div class="field-meta">
                      <label class="field-label">비밀번호</label>
                      <v-text-field
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword"
                        :disabled="!editing.password"
                        :rules="editing.password ? [rules.required, rules.password] : []"
                        dense
                        hide-details
                        rounded
                        prepend-inner-icon="mdi-lock"
                      />
                    </div>

                    <div class="field-action">
                      <v-btn text small :color="editing.password ? 'secondary' : 'primary'" @click="toggleEdit('password')">
                        {{ editing.password ? '취소' : '수정' }}
                      </v-btn>
                    </div>
                   </div>
                 </v-col>
 
                 <!-- NICKNAME -->
                 <v-col cols="12">
                   <div class="field-row">
                     <div class="field-meta">
                       <label class="field-label">닉네임</label>
                       <v-text-field
                         v-model="form.nickname"
                         :disabled="!editing.nickname"
                         :rules="editing.nickname ? [rules.required] : []"
                         dense
                         hide-details
                         rounded
                         prepend-inner-icon="mdi-account"
                       />
                     </div>

                    <div class="field-action">
                      <v-btn text small :color="editing.nickname ? 'secondary' : 'primary'" @click="toggleEdit('nickname')">
                        {{ editing.nickname ? '취소' : '수정' }}
                      </v-btn>
                    </div>
                   </div>
                 </v-col>

                <v-col cols="12" sm="6">
                  <label class="field-label">등급</label>
                  <v-chip class="level-chip" color="amber lighten-2" text-color="#04203a">{{ form.rate }}</v-chip>
                </v-col>

                <v-col cols="12" sm="6">
                  <label class="field-label">가입일</label>
                  <v-text-field
                    v-model="displayRegDate"
                    dense
                    hide-details
                    rounded
                    disabled
                    prepend-inner-icon="mdi-calendar"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions class="actions">
            <div class="action-left">
              <v-btn text small color="secondary" v-if="anyEditing" @click="cancelAll">취소</v-btn>
            </div>
            <div class="action-right">
              <v-btn color="error" @click="userDelete()">회원탈퇴</v-btn>
              <v-btn color="primary" :disabled="!anyEditing || !validForSave" @click="save">저장</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">{{ snackbar.text }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const loading = ref(false)

const form = ref({
  userId: user.user?.userId,
  email: user.user?.email,
  role: user.user?.role,
  rate: user.user?.rate,
  nickname: user.user?.nickname,
  regDate: user.user?.regDate
})

const displayRegDate = computed(() => {
  const raw = form.value.regDate || user.user?.regDate || ''
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
})

const editing = reactive({ email: false, password: false, nickname: false })
const anyEditing = computed(() => editing.email || editing.password || editing.nickname)
const valid = ref(false)
const showPassword = ref(false)
const snackbar = reactive({ show: false, text: '', color: 'success' })

const formRef = ref(null)

const fetchUser = async () => {
    loading.value = true
    try {
        const res = await user.fetchUserInfo()
        let data = res
        if (res && res.data) {
          const outer = res.data
          if (outer.data) data = outer.data
          else data = outer
        } else if (res && res.user) {
          data = res.user
        }

        form.value.email = data?.email
        form.value.nickname = data?.nickname
        form.value.role = data?.role
        form.value.rate = data?.rate
        form.value.regDate = data?.regDate
    } catch (error) {
        console.error(error)
        snackbar.text = '사용자 정보를 불러오는 중 오류가 발생했습니다.'
        snackbar.color = 'error'
        snackbar.show = true
    } finally {
        loading.value = false
    }
}

onMounted(fetchUser)

const rules = {
  required: v => !!v || '필수 입력입니다.',
  email: v => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요.',
  password: v => (v && v.length >= 6) || '비밀번호는 6자 이상이어야 합니다.'
}

function toggleEdit(field) {
  if (editing[field]) {
    cancelField(field)
    return
  }
  editing[field] = true
}

function cancelField(field) {
  if (field === 'email') form.value.email = user.user?.email || ''
  if (field === 'nickname') form.value.nickname = user.user?.nickname || ''
  if (field === 'password') form.value.password = ''
  editing[field] = false
}

function cancelAll() {
  cancelField('email')
  cancelField('password')
  cancelField('nickname')
}

const validForSave = computed(() => {
  if (editing.email) {
    if (!rules.required(form.value.email) || rules.email(form.value.email) === false) return false
    if (rules.email(form.value.email) !== true && typeof rules.email(form.value.email) === 'string') return false
  }
  if (editing.password) {
    if (!rules.password(form.value.password)) return false
  }
  if (editing.nickname) {
    if (!rules.required(form.value.nickname)) return false
  }
  return true
})

const save = async () => {
  if (!validForSave.value) {
    snackbar.text = '입력값을 확인하세요.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const changes = {}
  if (editing.email) changes.email = form.value.email
  if (editing.nickname) changes.nickname = form.value.nickname
  if (editing.password && form.value.password) changes.password = form.value.password

  if (!Object.keys(changes).length) {
    snackbar.text = '변경된 항목이 없습니다.'
    snackbar.color = 'warning'
    snackbar.show = true
    return
  }

  try {
    const updated = await user.updateUserInfo(changes)

    form.value.email = updated?.email ?? form.value.email
    form.value.nickname = updated?.nickname ?? form.value.nickname

    editing.email = editing.password = editing.nickname = false
    form.value.password = ''

    snackbar.text = '변경사항이 저장되었습니다.'
    snackbar.color = 'success'
    snackbar.show = true
    
    fetchUser()
    } catch (error) {
        console.error(error)
        snackbar.text = '사용자 정보 업데이트에 실패했습니다.'
        snackbar.color = 'error'
        snackbar.show = true
    }
}

const userDelete = async () => {
  if (!confirm('정말로 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

  try {
    await user.deleteUser(form.value.userId)
    snackbar.text = '회원탈퇴가 완료되었습니다.'
    snackbar.color = 'success'
    snackbar.show = true
    // 로그아웃 후 로그인 페이지로 이동
    document.cookie = "token=; max-age=0; path=/"
    router.push('/login')
  } catch (error) {
    console.error(error)
    snackbar.text = '회원탈퇴에 실패했습니다.'
    snackbar.color = 'error'
    snackbar.show = true
  }
}

watch(() => user.user, (u) => {
  form.value.email = u?.email || ''
  form.value.nickname = u?.nickname || ''
})
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  padding: 28px 20px;
  background: linear-gradient(135deg,#071033 0%, #0b3a66 60%);
  color: #f8fafc;
  display: block;
  margin-left: 260px;
}

@media (max-width: 960px) {
  .profile-container { margin-left: 72px; padding: 16px 12px; }
}

.profile-row { padding-top: 28px; }
.profile-col { margin-left: 8px; }

.profile-card { border-radius: 12px; overflow: hidden; background: #ffffff; color: #071033; }
.card-title { display: flex; flex-direction: column; gap: 4px; }
.card-title h2 { margin: 0; font-weight: 800; }
.muted { color: rgba(7,16,51,0.6); font-size: 13px; }
.field-label { display: block; font-size: 13px; color: rgba(7,16,51,0.7); margin-bottom: 6px; }
.level-chip { font-weight: 700; }
.actions { display: flex; justify-content: space-between; padding: 12px 16px; }
.action-left { display:flex; align-items:center; gap:8px; }
.action-right { display:flex; align-items:center; gap:8px; }

.field-row { display:flex; align-items:flex-start; gap:12px; }
.field-meta { flex: 1; }
.field-action { display:flex; align-items:center; }

.v-btn { font-weight: 700; }

@media (max-width: 600px) {
  .field-row { flex-direction: column; }
  .field-action { justify-content: flex-end; }
}
</style>