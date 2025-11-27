<template>
  <TkPageCard>
    <div class="card-widget" id="card-widget-calendar">
      <div class="item-headline">
        <i class="icon-calendar"></i>
      </div>
      <div class="item-content">
        <div id="calendar-area-left">
          <div id="calendar-week">
            第{{ weekNumber }}周&nbsp;{{ weekDays[today.getDay()] }}
          </div>
          <div id="calendar-date">{{ today.getDate() }}</div>
          <div id="calendar-solar">
            {{ today.getFullYear() }}年{{ today.getMonth() + 1 }}月第{{
              dayOfYear
            }}天
          </div>
          <div id="calendar-lunar">
            {{ lunarYear }}&nbsp;{{ lunarMonth }}&nbsp;{{ lunarDay }}
          </div>
        </div>
        <div id="calendar-area-right">
          <div id="calendar-main">
            <!-- 星期标题行 -->
            <div class="calendar-r0">
              <div class="calendar-d0"><a>日</a></div>
              <div class="calendar-d1"><a>一</a></div>
              <div class="calendar-d2"><a>二</a></div>
              <div class="calendar-d3"><a>三</a></div>
              <div class="calendar-d4"><a>四</a></div>
              <div class="calendar-d5"><a>五</a></div>
              <div class="calendar-d6"><a>六</a></div>
            </div>

            <!-- 日期行 -->
            <div
              v-for="(week, weekIndex) in calendarWeeks"
              :key="weekIndex"
              :class="`calendar-r${weekIndex + 1}`"
            >
              <div
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                :class="`calendar-d${dayIndex}`"
              >
                <a
                  :class="{ now: day.isToday, 'other-month': day.isOtherMonth }"
                  v-if="day.date"
                >
                  {{ day.date }}
                </a>
                <a v-else></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TkPageCard>
</template>

<script setup>
import { TkPageCard } from "vitepress-theme-teek";
import { ref, onMounted, onUnmounted, computed } from "vue";

// 星期几中文映射
const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

// 当前日期（响应式）
const today = ref(new Date());

// 同步今天（跨天更新触发）
const syncToday = () => {
  const now = new Date();
  // today.value = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  today.value = new Date(now); // 复制当前完整时间（包含分秒）
};

// 生成当前月份日历
const calendarWeeks = computed(() => {
  console.log(
    "今天的日期: today (Y-M-D H:m:s) =",
    today.value.getFullYear(),
    today.value.getMonth() + 1,   // 月份从 0 开始，所以 +1
    today.value.getDate(),
    today.value.getHours(),
    today.value.getMinutes(),
    today.value.getSeconds()
  );
  const year = today.value.getFullYear();
  const month = today.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const start = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - firstDay.getDay());
  const end = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + (6 - lastDay.getDay()));

  const dates = [];
  for (let d = new Date(start); d <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    const week = dates.slice(i, i + 7).map(day => ({
      date: day.getDate(),
      isToday: 
        day.getFullYear() === today.value.getFullYear() &&
        day.getMonth() === today.value.getMonth() &&
        day.getDate() === today.value.getDate(),
      isOtherMonth: day.getMonth() !== month
    }));
    weeks.push(week);
  }

  return weeks;
});

// 计算当前是今年的第几天
const dayOfYear = computed(() => {
  const start = new Date(today.value.getFullYear(), 0, 0);
  const diff = today.value - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
});

// 计算当前是第几周
const weekNumber = computed(() => {
  const firstDay = new Date(today.value.getFullYear(), 0, 1);
  const pastDaysOfYear = (today.value - firstDay) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7);
});

// --------- 农历数据与辅助数组 ----------
const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
  0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
  0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
  0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
  0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
  0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573,
  0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
  0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
  0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
  0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
  0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
  0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
  0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
  0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
  0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
  0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
];

const gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const zhi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const animals = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
const lunarMonths = ["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
const lunarDays = ["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];

// ---------- 农历辅助函数（基于 lunarInfo） ----------
function getLunarYearDays(y) {
  // 一年农历天数（含闰月）
  let sum = 348; // 29 * 12
  const info = lunarInfo[y - 1900];
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (info & i) ? 1 : 0;
  }
  return sum + getLeapMonthDays(y);
}

function getLeapMonth(y) {
  return lunarInfo[y - 1900] & 0xf; // 0 表示无闰月
}

function getLeapMonthDays(y) {
  return getLeapMonth(y) ? ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29) : 0;
}

function getLunarMonthDays(y, m) {
  // m 从 1 开始
  return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

// ---------- 稳妥的 getLunarDate 实现（本地时间、正确闰月处理） ----------
function getLunarDate(date) {
  // 基准日：1900-01-31（农历 1900-正月初一）
  const baseDate = new Date(1900, 0, 31);
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let offset = Math.floor((target - baseDate) / 86400000); // 0-based 天数差

  // 计算农历年
  let lunarYear = 1900;
  while (offset >= getLunarYearDays(lunarYear)) {
    offset -= getLunarYearDays(lunarYear);
    lunarYear++;
  }

  // 该年闰月信息
  const leap = getLeapMonth(lunarYear);
  let isLeap = false;
  let month = 1;
  let daysInMonth = 0;

  // 计算月份和日（offset 为该农历年内剩余天数，0 -> 初一）
  while (true) {
    if (isLeap) {
      daysInMonth = getLeapMonthDays(lunarYear);
    } else {
      daysInMonth = getLunarMonthDays(lunarYear, month);
    }

    if (offset < daysInMonth) break;

    offset -= daysInMonth;

    // 闰月切换逻辑：
    // 如果当前不是闰月且当前月是闰月标记的那个 month，则下一轮进入闰月
    if (!isLeap && leap > 0 && month === leap) {
      isLeap = true;
      // 注意：进入闰月时 month 不自增（表示闰在该月之后）
    } else {
      if (isLeap) {
        // 刚走完闰月，退出闰月并推进到下一个常规月
        isLeap = false;
        month++;
      } else {
        month++;
      }
    }
  }

  const lunarDay = offset + 1; // 1-based
  const lunarMonthStr = (isLeap ? "闰" : "") + lunarMonths[month - 1];
  const lunarDayStr = lunarDays[lunarDay - 1];

  const ganIndex = (lunarYear - 4) % 10;
  const zhiIndex = (lunarYear - 4) % 12;
  const lunarYearStr = `${gan[ganIndex]}${zhi[zhiIndex]}${animals[zhiIndex]}年`;

  return {
    lunarYear: lunarYearStr,
    lunarMonth: lunarMonthStr,
    lunarDay: lunarDayStr
  };
}

// 响应式农历数据（computed）
const lunarDate = computed(() => getLunarDate(today.value));
const lunarYear = computed(() => lunarDate.value.lunarYear);
const lunarMonth = computed(() => lunarDate.value.lunarMonth);
const lunarDay = computed(() => lunarDate.value.lunarDay);

// 在挂载时立即同步 today 并开始跨天检查
onMounted(() => {
  // 立即同步一次
  syncToday();

  // 每分钟同步一次
  const intervalId = setInterval(syncToday, 60 * 1000);

  // 可见性切换处理（具名）
  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      syncToday();
    }
  };

  // 窗口 focus 处理（具名）
  const handleWindowFocus = () => syncToday();

  // 只在客户端添加监听（SSR guard）
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('focus', handleWindowFocus);
  }

  // 清理：确保移除与 interval 清空
  onUnmounted(() => {
    clearInterval(intervalId);
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', handleWindowFocus);
    }
  });
});
</script>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", sans-serif;
}

body {
  background-color: #f5f7fa;
  padding: 20px;
}

:root {
  --other-month-color: #0080ff;
}

.dark {
  --other-month-color: #0080ff;
}

.tk-page-card {
  margin-top: 10px;
}

.card-widget {
  max-height: calc(100vh - 100px);
  position: relative;
}

#card-widget-calendar .item-headline {
  padding-bottom: 0;
  margin-left: 8px;
  font-size: 1em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

#card-widget-calendar .item-headline i {
  font-size: 18px;
}

#card-widget-calendar .item-content {
  display: flex;
}

#calendar-area-left,
#calendar-area-right {
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#calendar-area-left {
  width: 45%;
}

#calendar-week {
  height: 1.2rem;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 700;
  align-items: center;
  display: flex;
}

#calendar-date {
  height: 3rem;
  line-height: 1.3;
  font-size: 36px;
  letter-spacing: 3px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  align-items: center;
  display: flex;
  position: absolute;
  top: calc(50% - 2.1rem);
}

#calendar-solar {
  bottom: 2.1rem;
}

#calendar-lunar,
#calendar-solar {
  height: 1rem;
  font-size: 11px;
  align-items: center;
  display: flex;
  position: absolute;
}

#calendar-lunar {
  bottom: 1rem;
}

#calendar-area-right {
  width: 55%;
}

#calendar-main {
  width: 100%;
}

.calendar-r0,
.calendar-r1,
.calendar-r2,
.calendar-r3,
.calendar-r4,
.calendar-r5,
.calendar-r6,
.calendar-rh {
  height: 1.2rem;
  display: flex;
}

.calendar-d0,
.calendar-d1,
.calendar-d2,
.calendar-d3,
.calendar-d4,
.calendar-d5,
.calendar-d6 {
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
}

#calendar-main a {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--calendar-main-a-color);
}

#calendar-main a.now {
  background: var(--vp-c-brand-1);
  color: #fff;
}

#calendar-main a.other-month {
  color: var(--other-month-color);
}
</style>