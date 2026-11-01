<template>
  <section id="comments" class="zc">
    <header class="zc-head">
      <div class="zc-head-top">
        <h2 class="zc-title">
          评论
          <span class="zc-count">{{ total }}</span>
        </h2>
        <button
          class="zc-refresh"
          :class="{ 'is-busy': refreshing }"
          type="button"
          :disabled="offline || refreshing || loading"
          aria-label="刷新评论"
          :title="offline ? '本地调试未连接评论服务' : '刷新评论'"
          @click="refresh"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 8a4 4 0 0 1 6.9-2.75"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
            />
            <path
              d="M10.4 2.6 10.9 5.25 8.4 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 8a4 4 0 0 1-6.9 2.75"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
            />
            <path
              d="M5.6 13.4 5.1 10.75 7.6 11.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <form class="zc-form" novalidate @submit.prevent="openConfirm">
      <div class="zc-editor">
        <div v-if="replyTarget" class="zc-reply-bar">
          回复 <strong>@{{ replyTarget.name }}</strong>
          <button type="button" class="zc-link" @click="cancelReply">取消</button>
        </div>

        <div class="zc-editor-head">
          <div class="zc-tabs">
            <button
              type="button"
              :class="{ 'is-active': !previewing }"
              @click="previewing = false"
            >编辑</button>
            <button type="button" :class="{ 'is-active': previewing }" @click="previewing = true">
              预览
            </button>
          </div>
        </div>

        <textarea
          v-show="!previewing"
          ref="editor"
          v-model="form.content"
          class="zc-textarea"
          rows="4"
          maxlength="4000"
          placeholder="说点什么吧…（支持 Markdown）"
          @keydown.ctrl.enter.prevent="openConfirm"
          @keydown.meta.enter.prevent="openConfirm"
        ></textarea>

        <div v-show="previewing" class="zc-preview">
          <MarkdownBody v-if="form.content.trim()" :text="form.content" />
          <p v-else class="zc-preview-empty">还没有输入内容</p>
        </div>
      </div>

      <!-- 蜜罐：真人看不到，也不会填写 -->
      <input
        v-model="form.nickname2"
        class="zc-hp"
        type="text"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div class="zc-actions">
        <button
          class="zc-submit"
          type="submit"
          :disabled="offline || submitting"
          :title="offline ? '本地调试未连接评论服务' : undefined"
        >
          {{ submitting ? "发送中…" : "发送" }}
        </button>
      </div>

      <p v-if="error" class="zc-msg is-error">{{ error }}</p>
    </form>

    <!-- 所有确认都在同一套弹窗里：发送、进入管理、删除 -->
    <Teleport to="body">
      <div v-if="dialog" class="zc-mask" @click.self="closeDialog">
        <div
          v-if="dialog === 'send'"
          class="zc-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="zc-dialog-title"
        >
          <h3 id="zc-dialog-title" class="zc-modal-title">确认发送评论</h3>
          <p class="zc-modal-sub"><template v-if="replyTarget">正在回复 <strong>@{{ replyTarget.name }}</strong>，</template>昵称和评论内容公开可见，邮箱仅用于回复通知、不对外公开。</p>

          <form @submit.prevent="submit">
            <label class="zc-modal-field">
              <span class="zc-modal-label">昵称 <em>*</em></span>
              <input
                ref="nameInput"
                v-model="form.name"
                class="zc-input"
                type="text"
                maxlength="32"
                autocomplete="nickname"
                placeholder="会公开显示在评论上"
              />
            </label>

            <label class="zc-modal-field">
              <span class="zc-modal-label">邮箱 <em class="is-optional">选填</em></span>
              <input
                v-model="form.email"
                class="zc-input"
                type="email"
                maxlength="128"
                autocomplete="email"
                placeholder="仅用于回复通知，不对外公开"
              />
            </label>

            <label class="zc-notify">
              <input v-model="form.notify" type="checkbox" />
              有回复时邮件通知我
            </label>

            <p v-if="dialogError" class="zc-msg is-error">{{ dialogError }}</p>

            <div class="zc-modal-actions">
              <button type="button" class="zc-btn" @click="closeDialog">取消</button>
              <button type="submit" class="zc-submit" :disabled="submitting">
                {{ submitting ? "发送中…" : "确认发送" }}
              </button>
            </div>
          </form>
        </div>

        <div
          v-else-if="dialog === 'admin'"
          class="zc-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="zc-dialog-title"
        >
          <h3 id="zc-dialog-title" class="zc-modal-title">进入管理模式</h3>
          <p class="zc-modal-sub">
            填写管理令牌后，每条评论才会出现「删除」按钮。令牌只保存在当前标签页，关闭页面即失效。
          </p>

          <form @submit.prevent="applyAdmin">
            <label class="zc-modal-field">
              <span class="zc-modal-label">管理令牌 <em>*</em></span>
              <input
                ref="tokenInput"
                v-model="tokenDraft"
                class="zc-input"
                type="password"
                maxlength="128"
                autocomplete="off"
                placeholder="填写管理令牌"
              />
            </label>

            <p v-if="dialogError" class="zc-msg is-error">{{ dialogError }}</p>

            <div class="zc-modal-actions">
              <button type="button" class="zc-btn" @click="closeDialog">取消</button>
              <button type="submit" class="zc-submit">进入管理</button>
            </div>
          </form>
        </div>

        <div
          v-else
          class="zc-modal"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="zc-dialog-title"
        >
          <h3 id="zc-dialog-title" class="zc-modal-title">删除评论</h3>
          <p class="zc-modal-sub">这条评论和它的直接回复会一起删除，且无法恢复。</p>

          <p v-if="dialogError" class="zc-msg is-error">{{ dialogError }}</p>

          <div class="zc-modal-actions">
            <button type="button" class="zc-btn" @click="closeDialog">取消</button>
            <button type="button" class="zc-submit is-danger" :disabled="deleting" @click="confirmDelete">
              {{ deleting ? "删除中…" : "确认删除" }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <p v-if="offline" class="zc-empty">本地调试未连接评论服务，不会加载也不会提交评论。</p>
    <p v-else-if="loading" class="zc-empty">评论加载中…</p>
    <p v-else-if="loadError" class="zc-empty is-error">评论加载失败：{{ loadError }}</p>
    <p v-else-if="!threads.length" class="zc-empty">还没有评论，来抢个沙发～</p>

    <ul v-else class="zc-list">
      <li v-for="thread in threads" :key="thread.id" class="zc-thread">
        <article class="zc-item">
          <span class="zc-avatar" :style="avatarStyle(thread.name)">{{ initial(thread.name) }}</span>
          <div class="zc-main">
            <div class="zc-meta">
              <span class="zc-name">{{ thread.name }}</span>
              <time class="zc-time" :datetime="new Date(thread.createdAt).toISOString()" :title="fullTime(thread.createdAt)">
                {{ formatTime(thread.createdAt) }}
              </time>
            </div>
            <MarkdownBody class="zc-content" :text="thread.content" />
            <div class="zc-tools">
              <button type="button" @click="startReply(thread, thread.id)">回复</button>
              <button v-if="adminToken" type="button" class="is-danger" @click="askDelete(thread.id)">删除</button>
            </div>

            <ul v-if="thread.replies.length" class="zc-replies">
              <li v-for="reply in thread.replies" :key="reply.id" class="zc-reply">
                <article class="zc-item is-reply">
                  <span class="zc-avatar is-small" :style="avatarStyle(reply.name)">{{
                    initial(reply.name)
                  }}</span>
                  <div class="zc-main">
                    <div class="zc-meta">
                      <span class="zc-name">{{ reply.name }}</span>
                      <span v-if="reply.replyTo" class="zc-at">回复 @{{ reply.replyTo }}</span>
                      <time
                        class="zc-time"
                        :datetime="new Date(reply.createdAt).toISOString()"
                        :title="fullTime(reply.createdAt)"
                      >{{ formatTime(reply.createdAt) }}</time>
                    </div>
                    <MarkdownBody class="zc-content" :text="reply.content" />
                    <div class="zc-tools">
                      <button type="button" @click="startReply(reply, thread.id)">回复</button>
                      <button v-if="adminToken" type="button" class="is-danger" @click="askDelete(reply.id)">删除</button>
                    </div>
                  </div>
                </article>
              </li>
            </ul>
          </div>
        </article>
      </li>
    </ul>

    <button v-if="hasMore" class="zc-more" type="button" :disabled="loadingMore" @click="loadMore">
      {{ loadingMore ? "加载中…" : "加载更多评论" }}
    </button>

    <footer class="zc-foot">
      <button v-if="!adminToken" class="zc-link" type="button" @click="enterAdmin">管理</button>
      <button v-else class="zc-link" type="button" @click="exitAdmin">退出管理</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vitepress";
import { COMMENTS_PAGE_SIZE, commentsEndpoint } from "../config/comments";
import MarkdownBody from "./MarkdownBody.vue";

interface CommentItem {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  replyTo: string | null;
}

interface Thread extends CommentItem {
  replies: CommentItem[];
}

interface ReplyTarget {
  id: string;
  name: string;
  threadId: string;
}

const route = useRoute();

const threads = ref<Thread[]>([]);
const total = ref(0);
const hasMore = ref(false);
const nextBefore = ref<string | null>(null);
const loading = ref(true);
const loadingMore = ref(false);
const refreshing = ref(false);
const loadError = ref("");
// 本地调试未接后端时整个组件只读：不发请求、不报错
const offline = !commentsEndpoint;
const error = ref("");
const dialog = ref<"" | "send" | "admin" | "delete">("");
const dialogError = ref("");
const submitting = ref(false);
const deleting = ref(false);
const replyTarget = ref<ReplyTarget | null>(null);
const previewing = ref(false);
const editor = ref<HTMLTextAreaElement | null>(null);
const nameInput = ref<HTMLInputElement | null>(null);
const tokenInput = ref<HTMLInputElement | null>(null);
const adminToken = ref("");
const tokenDraft = ref("");
const pendingDelete = ref("");

const form = reactive({
  name: "",
  email: "",
  content: "",
  notify: true,
  nickname2: "",
});

// 服务端要求提交时间距表单渲染至少 2 秒，过久的旧时间戳会被当作可疑提交
const startedAt = ref(Date.now());
const resetStartedAt = () => {
  startedAt.value = Date.now();
};

const page = () => route.path;

// ---------- 时间 ----------
// 相对时间必须自己走：静态站点没有刷新机制，跨零点/跨小时也要跟着变
const now = ref(Date.now());
let ticker: ReturnType<typeof setInterval> | undefined;

const refreshNow = () => {
  now.value = Date.now();
};

const onVisibilityChange = () => {
  if (document.visibilityState === "visible") refreshNow();
};

const formatTime = (ts: number) => {
  const diff = Math.max(0, now.value - ts);
  if (diff < 60_000) return "刚刚";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} 天前`;
  return new Date(ts).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const fullTime = (ts: number) =>
  new Date(ts).toLocaleString("zh-CN", { hour12: false });

// ---------- 展示辅助 ----------
const initial = (name: string) => Array.from((name || "").trim())[0]?.toUpperCase() || "?";

const avatarStyle = (name: string) => {
  let hue = 0;
  for (const ch of name || "?") hue = (hue * 31 + (ch.codePointAt(0) || 0)) % 360;
  return { background: `hsl(${hue} 56% 52%)` };
};

// ---------- 读取 ----------
async function fetchList(before: string | null): Promise<void> {
  const params = new URLSearchParams({ p: page(), limit: String(COMMENTS_PAGE_SIZE) });
  if (before) params.set("before", before);

  const res = await fetch(`${commentsEndpoint}/api/comments?${params}`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  threads.value = before ? [...threads.value, ...data.threads] : data.threads;
  total.value = data.total;
  hasMore.value = data.hasMore;
  nextBefore.value = data.next;
}

async function reload() {
  loading.value = true;
  loadError.value = "";
  try {
    await fetchList(null);
  } catch (e) {
    threads.value = [];
    total.value = 0;
    hasMore.value = false;
    loadError.value = (e as Error).message;
  } finally {
    loading.value = false;
  }
}

async function loadMore() {
  if (loadingMore.value || !nextBefore.value) return;
  loadingMore.value = true;
  try {
    await fetchList(nextBefore.value);
  } catch {
    /* 保持已有列表，用户可以再点一次 */
  } finally {
    loadingMore.value = false;
  }
}

// 手动刷新回到第一页，别处的进度不保留，但当前内容不会先被清空
async function refresh() {
  if (refreshing.value || loading.value) return;
  refreshing.value = true;
  loadError.value = "";
  try {
    await fetchList(null);
  } catch (e) {
    loadError.value = (e as Error).message;
  } finally {
    refreshing.value = false;
  }
}

// ---------- 写入 ----------
function startReply(item: CommentItem, threadId: string) {
  replyTarget.value = { id: item.id, name: item.name, threadId };
  // 预览状态下 textarea 是隐藏的，先切回编辑再聚焦，否则点了没反应
  previewing.value = false;
  nextTick(() => editor.value?.focus());
}

function cancelReply() {
  replyTarget.value = null;
}

function openDialog(next: "send" | "admin" | "delete") {
  dialogError.value = "";
  dialog.value = next;
  document.body.style.overflow = "hidden";
  nextTick(() => {
    if (next === "send") {
      nameInput.value?.focus();
      nameInput.value?.select();
    } else if (next === "admin") {
      tokenInput.value?.focus();
    }
  });
}

function closeDialog() {
  if (!dialog.value) return;
  const wasSend = dialog.value === "send";
  dialog.value = "";
  dialogError.value = "";
  document.body.style.overflow = "";
  if (wasSend) nextTick(() => editor.value?.focus());
}

function openConfirm() {
  if (offline || submitting.value) return;
  if (!form.content.trim()) {
    error.value = "评论内容不能为空";
    editor.value?.focus();
    return;
  }
  error.value = "";
  openDialog("send");
}

// 评论要先写进对象存储，正常也要好几秒；超过这个时间就当作请求已经废了
const SUBMIT_TIMEOUT_MS = 30_000;

async function submit() {
  if (submitting.value) return;

  const content = form.content.trim();
  if (!form.name.trim()) {
    dialogError.value = "请填写昵称";
    nameInput.value?.focus();
    return;
  }
  if (!content) {
    dialogError.value = "评论内容不能为空";
    return;
  }

  submitting.value = true;
  dialogError.value = "";
  error.value = "";

  const target = replyTarget.value;
  // 服务端要等评论落库（自建 S3 网关单程就要几秒），没有兜底的话请求一旦挂掉，
  // 按钮会永远停在"发送中"。
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
  try {
    const res = await fetch(`${commentsEndpoint}/api/comment`, {
      method: "POST",
      signal: controller.signal,
      // text/plain 让请求保持 CORS-simple，不触发预检
      headers: { "content-type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        p: page(),
        name: form.name.trim(),
        email: form.email.trim(),
        content,
        parentId: target?.id || null,
        notify: form.notify,
        nickname2: form.nickname2,
        t0: startedAt.value,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      dialogError.value = data.error || `发送失败（${res.status}）`;
      // 页面停留过久：换个新时间戳，用户重试即可
      if (res.status === 400 && String(data.error).includes("停留")) resetStartedAt();
      return;
    }

    const created: CommentItem = data.comment;
    if (target) {
      const thread = threads.value.find((t) => t.id === target.threadId);
      if (thread) thread.replies.push(created);
      else await reload();
    } else {
      threads.value.unshift({ ...created, replies: [] });
    }

    total.value += 1;
    form.content = "";
    form.nickname2 = "";
    replyTarget.value = null;
    previewing.value = false;
    resetStartedAt();
    closeDialog();

    // 邮箱不留存：共用电脑上不该把别人的地址留在浏览器里
    localStorage.setItem("zc_name", form.name);
  } catch (e) {
    dialogError.value =
      (e as Error)?.name === "AbortError"
        ? "发送超时，评论可能已经提交，请稍后刷新确认"
        : "网络异常，请稍后重试";
  } finally {
    clearTimeout(timer);
    submitting.value = false;
  }
}

// ---------- 管理 ----------
function enterAdmin() {
  tokenDraft.value = adminToken.value;
  openDialog("admin");
}

function exitAdmin() {
  adminToken.value = "";
  tokenDraft.value = "";
  sessionStorage.removeItem("zc_admin");
}

function applyAdmin() {
  const token = tokenDraft.value.trim();
  if (!token) {
    dialogError.value = "请填写管理令牌";
    tokenInput.value?.focus();
    return;
  }
  adminToken.value = token;
  sessionStorage.setItem("zc_admin", token);
  closeDialog();
}

function askDelete(id: string) {
  if (!adminToken.value) return;
  pendingDelete.value = id;
  openDialog("delete");
}

async function confirmDelete() {
  const id = pendingDelete.value;
  if (!adminToken.value || !id || deleting.value) return;

  deleting.value = true;
  dialogError.value = "";
  try {
    const params = new URLSearchParams({ p: page(), id });
    const res = await fetch(`${commentsEndpoint}/api/comment?${params}`, {
      method: "DELETE",
      headers: { "x-comment-token": adminToken.value },
    });
    if (res.status === 401 || res.status === 403) {
      exitAdmin();
      error.value = "管理令牌无效或删除接口未开启";
      closeDialog();
      return;
    }
    if (!res.ok) {
      dialogError.value = `删除失败（${res.status}）`;
      return;
    }
    closeDialog();
    await reload();
  } catch {
    dialogError.value = "网络异常，请稍后重试";
  } finally {
    deleting.value = false;
  }
}

// ---------- 生命周期 ----------
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && dialog.value) closeDialog();
};

onMounted(() => {
  form.name = localStorage.getItem("zc_name") || "";
  adminToken.value = sessionStorage.getItem("zc_admin") || "";

  resetStartedAt();
  if (!offline) reload();

  ticker = setInterval(refreshNow, 60_000);
  document.addEventListener("visibilitychange", onVisibilityChange);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  clearInterval(ticker);
  document.removeEventListener("visibilitychange", onVisibilityChange);
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

// 路由切换 = 换文章：清空并重新拉取，同时重置蜜罐计时
watch(
  () => route.path,
  () => {
    threads.value = [];
    total.value = 0;
    hasMore.value = false;
    nextBefore.value = null;
    replyTarget.value = null;
    previewing.value = false;
    error.value = "";
    closeDialog();
    resetStartedAt();
    if (!offline) reload();
  }
);
</script>

<style scoped>
.zc {
  margin-top: 40px;
  padding-top: 8px;
  color: var(--vp-c-text-1);
}

.zc-head {
  margin-bottom: 20px;
}

.zc-head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.zc-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 600;
  border-top: none;
}

.zc-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.zc-refresh svg {
  width: 22px;
  height: 22px;
}

.zc-refresh:hover:not(:disabled) {
  background: var(--vp-c-bg-alt);
}

.zc-refresh:disabled {
  cursor: default;
  opacity: 0.45;
}

.zc-refresh.is-busy svg {
  animation: zc-spin 0.9s linear infinite;
}

@keyframes zc-spin {
  to {
    transform: rotate(360deg);
  }
}

.zc-count {
  padding: 0 8px;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
}

.zc-sub {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* ---------- 表单 ---------- */
.zc-form {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.zc-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.zc-input:focus {
  border-color: var(--vp-c-brand-1);
}

.zc-editor {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  overflow: hidden;
  transition: border-color 0.2s;
}

.zc-editor:focus-within {
  border-color: var(--vp-c-brand-1);
}

.zc-reply-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.zc-reply-bar .zc-link {
  margin-left: auto;
}

.zc-editor-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.zc-tabs {
  display: flex;
  gap: 2px;
}

.zc-tabs button {
  padding: 2px 10px;
  border: none;
  border-radius: 4px;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.zc-tabs button.is-active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.zc-md-hint {
  margin-left: auto;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.zc-textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 96px;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.7;
  resize: vertical;
  outline: none;
}

.zc-preview {
  min-height: 96px;
  max-height: 360px;
  padding: 10px 12px;
  overflow-y: auto;
}

.zc-preview-empty {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.zc-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.zc-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
}

.zc-notify {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.zc-notify input {
  accent-color: var(--vp-c-brand-1);
}

.zc-submit {
  padding: 0 20px;
  height: 34px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;
}

.zc-submit:hover:not(:disabled) {
  opacity: 0.86;
}

.zc-submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.zc-submit.is-danger {
  background: #d64545;
}

.zc-msg {
  margin: 10px 0 0;
  font-size: 12px;
}

.zc-msg.is-error,
.zc-empty.is-error {
  color: #d64545;
}

/* ---------- 确认弹窗 ---------- */
/* 挂在 body 上，避免被文章容器的溢出和层级裁掉 */
.zc-mask {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(17, 20, 26, 0.45);
  backdrop-filter: blur(2px);
  animation: zc-fade 0.16s ease-out;
}

.zc-modal {
  width: min(400px, 100%);
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
  text-align: left;
  animation: zc-pop 0.18s ease-out;
}

.zc-modal-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-top: none;
}

.zc-modal-sub {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

.zc-modal-field {
  display: block;
  margin-bottom: 12px;
}

.zc-modal-label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.zc-modal-label em {
  font-style: normal;
  color: #d64545;
}

.zc-modal-label em.is-optional {
  color: var(--vp-c-text-3);
}

.zc-modal .zc-input {
  height: 36px;
}

.zc-modal .zc-notify {
  margin-top: 4px;
}

.zc-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.zc-btn {
  height: 34px;
  padding: 0 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.zc-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@keyframes zc-fade {
  from {
    opacity: 0;
  }
}

@keyframes zc-pop {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}

/* ---------- 列表 ---------- */
.zc-empty {
  margin: 28px 0;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.zc-list {
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.zc-thread + .zc-thread {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.zc-item {
  display: flex;
  gap: 12px;
}

.zc-avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  user-select: none;
}

.zc-avatar.is-small {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

.zc-main {
  flex: 1;
  min-width: 0;
}

.zc-meta {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
}

.zc-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.zc-at {
  color: var(--vp-c-text-3);
}

.zc-time {
  margin-left: auto;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.zc-content {
  margin: 6px 0 0;
}

.zc-tools {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.zc-tools button {
  padding: 0;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  font-size: 12px;
  cursor: pointer;
}

.zc-tools button:hover {
  color: var(--vp-c-brand-1);
}

.zc-tools button.is-danger:hover {
  color: #d64545;
}

.zc-replies {
  margin: 12px 0 0;
  padding: 0 0 0 4px;
  list-style: none;
  border-left: 2px solid var(--vp-c-divider);
}

.zc-reply {
  padding-left: 12px;
}

.zc-reply + .zc-reply {
  margin-top: 12px;
}

.zc-more {
  display: block;
  width: 100%;
  margin-top: 20px;
  height: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
}

.zc-more:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.zc-foot {
  margin-top: 18px;
  text-align: right;
}

.zc-link {
  padding: 0;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  font-size: 12px;
  cursor: pointer;
}

.zc-link:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .zc-form {
    padding: 12px;
  }

  .zc-modal {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .zc-mask,
  .zc-modal {
    animation: none;
  }
}
</style>
