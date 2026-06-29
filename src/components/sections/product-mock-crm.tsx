import { cn } from '#/lib/utils';

/**
 * CRM 产品 UI 模拟：3 层浮动卡片
 * 背景层：线索池表格
 * 前景层：销售漏斗
 * 悬浮层：客户 360° 卡片
 */
export function ProductMockCrm() {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* === 背景层：线索池表格 === */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 z-10',
          'rounded-xl border border-border bg-surface shadow-md',
          'p-4',
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-text">线索池 · 本周</span>
          <span className="font-mono text-xs text-text-muted">128 条</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-text-muted">
              <th className="py-1.5 text-left font-medium">客户</th>
              <th className="py-1.5 text-left font-medium">来源</th>
              <th className="py-1.5 text-left font-medium">状态</th>
              <th className="py-1.5 text-right font-medium">金额</th>
            </tr>
          </thead>
          <tbody>
            {CRM_LEADS.map((lead) => (
              <tr key={lead.name} className="border-b border-border/50 last:border-0">
                <td className="py-1.5 font-medium text-text">{lead.name}</td>
                <td className="py-1.5 text-text-muted">{lead.source}</td>
                <td className="py-1.5">
                  <span className="inline-flex items-center gap-1">
                    <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[lead.status])} />
                    <span className="text-text-soft">{lead.status}</span>
                  </span>
                </td>
                <td className="py-1.5 text-right font-mono text-text">{lead.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === 前景层：销售漏斗 === */}
      <div
        className={cn(
          'absolute -bottom-4 right-2 z-20 w-[68%]',
          'rounded-xl border border-border bg-surface shadow-xl',
          'p-4',
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-text">销售漏斗</span>
          <span className="font-mono text-xs text-text-muted">¥ 3.2M</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {FUNNEL.map((stage) => (
            <div key={stage.name} className="flex items-center gap-2 text-xs">
              <span className="w-16 shrink-0 text-text-muted">{stage.name}</span>
              <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-surface-strong">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full',
                    'bg-gradient-to-r from-brand-500 to-accent-500',
                  )}
                  style={{ width: `${stage.width}%` }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-text-soft">
                {stage.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* === 悬浮层：客户 360° 卡片 === */}
      <div
        className={cn(
          'absolute -right-2 top-12 z-30 w-[52%] sm:w-[44%]',
          '-rotate-2',
          'rounded-xl border border-brand-500/30 bg-surface shadow-2xl',
          'p-3.5',
        )}
      >
        <div className="mb-2 flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
            蓝
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-text">蓝芯科技 · 张总</div>
            <div className="text-xs text-text-muted">最近跟进 · 2 小时前</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 border-t border-border pt-2 text-center">
          <div>
            <div className="font-mono text-xs font-semibold text-text">¥ 480k</div>
            <div className="text-[10px] text-text-muted">合同</div>
          </div>
          <div>
            <div className="font-mono text-xs font-semibold text-text">12 次</div>
            <div className="text-[10px] text-text-muted">沟通</div>
          </div>
          <div>
            <div className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">85%</div>
            <div className="text-[10px] text-text-muted">成交</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === CRM 假数据 === */
interface Lead {
  name: string;
  source: string;
  status: '进行中' | '待跟进' | '已签约' | '搁置';
  amount: string;
}

const CRM_LEADS: readonly Lead[] = [
  { name: '蓝芯科技', source: '官网', status: '进行中', amount: '¥ 480k' },
  { name: '拓远数据', source: '转介绍', status: '已签约', amount: '¥ 320k' },
  { name: '星汉智能', source: '活动', status: '待跟进', amount: '¥ 260k' },
  { name: '云泽物联', source: '官网', status: '进行中', amount: '¥ 580k' },
  { name: '天璇数科', source: '招标', status: '搁置', amount: '¥ 1.2M' },
];

const STATUS_DOT: Record<Lead['status'], string> = {
  进行中: 'bg-brand-500',
  待跟进: 'bg-warning',
  已签约: 'bg-success',
  搁置: 'bg-text-muted',
};

interface FunnelStage {
  name: string;
  width: number;
  value: string;
}

const FUNNEL: readonly FunnelStage[] = [
  { name: '初步沟通', width: 100, value: '¥ 3.2M' },
  { name: '需求确认', width: 82, value: '¥ 2.6M' },
  { name: '方案报价', width: 64, value: '¥ 2.0M' },
  { name: '谈判中', width: 46, value: '¥ 1.5M' },
  { name: '已成交', width: 28, value: '¥ 0.9M' },
];