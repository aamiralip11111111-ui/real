import React, { useState } from 'react';
import {
  Layers,
  Activity,
  Gauge,
  ShieldAlert,
  Flame,
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { EightPillarsAnalysis, BotConfig } from '../types/trading';

interface EightPillarsAnalysisPanelProps {
  analysis: EightPillarsAnalysis;
  currentPrice: number;
  config: BotConfig;
  symbol: string;
}

export const EightPillarsAnalysisPanel: React.FC<EightPillarsAnalysisPanelProps> = ({
  analysis,
  currentPrice,
  config,
  symbol,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  const {
    obi,
    orderFlowCvd,
    tickMomentum,
    liquidityWalls,
    futuresLiquidations,
    microVolatility,
    spreadSlippage,
    mlModel,
  } = analysis;

  return (
    <div className="bg-[#0b101c] border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden space-y-4">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 text-indigo-400 shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                8 Advanced Quantitative Market Analyses
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                Sub-Second Fluctuation Engine
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
                Target: $0.30 - $1.00 Micro-Gaps
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-level OBI, CVD flow, tick velocity, liquidity walls, derivatives telemetry &amp; calibrated ML probability
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Collapse Matrix
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Expand 8 Analyses
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* =========================================================================
              PILLAR 1: ORDER BOOK IMBALANCE (OBI)
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 1 ? null : 1)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 1
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                1. Order Book Imbalance (OBI)
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  obi.weightedObiScore >= 15
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : obi.weightedObiScore <= -15
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {obi.weightedObiScore > 0 ? '+' : ''}{obi.weightedObiScore}%
              </span>
            </div>

            {/* Depth Level Ratios */}
            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">L1 (Top)</div>
                <div className={obi.level1Ratio >= 1 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {obi.level1Ratio}x
                </div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">L5</div>
                <div className={obi.level5Ratio >= 1 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {obi.level5Ratio}x
                </div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">L10</div>
                <div className="text-slate-300 font-bold">{obi.level10Ratio}x</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">L25 (Deep)</div>
                <div className="text-slate-400 font-bold">{obi.level25Ratio}x</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {obi.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 2: REAL-TIME ORDER FLOW & CVD
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 2 ? null : 2)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 2
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                2. Real-Time Order Flow &amp; CVD
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  orderFlowCvd.cvdDivergence === 'BULLISH_ABSORPTION'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}
              >
                {orderFlowCvd.cvdDivergence === 'BULLISH_ABSORPTION' ? '⚡ ABSORPTION' : orderFlowCvd.cvdDivergence}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Buyers</div>
                <div className="text-emerald-400 font-bold">{orderFlowCvd.aggressiveBuyRatio}%</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Sellers</div>
                <div className="text-rose-400 font-bold">{orderFlowCvd.aggressiveSellRatio}%</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">CVD Velocity</div>
                <div className={orderFlowCvd.cvdVelocity1s >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {orderFlowCvd.cvdVelocity1s > 0 ? '+' : ''}{orderFlowCvd.cvdVelocity1s}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {orderFlowCvd.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 3: TICK-BY-TICK MOMENTUM
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 3 ? null : 3)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 3
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                3. Tick-by-Tick Momentum
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  tickMomentum.momentumDirection === 'ACCELERATING_UP'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : tickMomentum.momentumDirection === 'ACCELERATING_DOWN'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {tickMomentum.momentumDirection}
              </span>
            </div>

            <div className="p-2 rounded bg-slate-900/90 border border-slate-800 font-mono text-[11px] flex items-center justify-between">
              <span className="text-slate-400">1s Tick Forecast:</span>
              <span className="text-emerald-400 font-bold">{tickMomentum.predictedTickPath}</span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Velocity</div>
                <div className="text-cyan-400 font-bold">{tickMomentum.tickVelocity} trades/s</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Acceleration</div>
                <div className={tickMomentum.priceAcceleration >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {tickMomentum.priceAcceleration > 0 ? '+' : ''}{tickMomentum.priceAcceleration}$/s²
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {tickMomentum.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 4: LIQUIDITY WALL & ORDER-BOOK CHANGES
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 4 ? null : 4)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 4
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                4. Liquidity Walls &amp; Spoofing
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  liquidityWalls.wallDynamics === 'PHANTOM_SPOOF_RISK'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {liquidityWalls.wallDynamics}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Support Bid Wall</div>
                <div className="text-emerald-400 font-bold">
                  {liquidityWalls.nearestBuyWallAmount} @ ${liquidityWalls.nearestBuyWallPrice.toFixed(1)}
                </div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Resistance Ask Wall</div>
                <div className="text-rose-400 font-bold">
                  {liquidityWalls.nearestSellWallAmount} @ ${liquidityWalls.nearestSellWallPrice.toFixed(1)}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {liquidityWalls.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 5: FUTURES POSITIONING & LIQUIDATIONS
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 5 ? null : 5)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 5
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                5. Futures &amp; Liquidations
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  futuresLiquidations.positioningSqueezeBias === 'SHORT_SQUEEZE_UP'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {futuresLiquidations.positioningSqueezeBias}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">8h Funding Rate</div>
                <div className="text-cyan-400 font-bold">
                  {futuresLiquidations.estimatedFundingRate8h > 0 ? '+' : ''}
                  {futuresLiquidations.estimatedFundingRate8h.toFixed(4)}%
                </div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Open Interest</div>
                <div className="text-slate-200 font-bold">{futuresLiquidations.openInterestUsd}</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {futuresLiquidations.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 6: MICRO-VOLATILITY & PRICE ACCELERATION
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 6 ? null : 6)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 6
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-400" />
                6. Micro-Volatility Plausibility
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {microVolatility.plausibility50Cent1s}% (1s $0.50 Move)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">$0.20 in 100ms</div>
                <div className="text-emerald-400 font-bold">{microVolatility.plausibility20Cent100ms}%</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">$0.50 in 1s</div>
                <div className="text-emerald-400 font-bold">{microVolatility.plausibility50Cent1s}%</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">$1.00 in 5s</div>
                <div className="text-cyan-400 font-bold">{microVolatility.plausibility1Dollar5s}%</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {microVolatility.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 7: SPREAD, SLIPPAGE & EXECUTION
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 7 ? null : 7)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 7
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                7. Spread &amp; Slippage Audited
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                NET EDGE +${spreadSlippage.expectedNetEdgeUsd.toFixed(6)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Spread</div>
                <div className="text-slate-300 font-bold">${spreadSlippage.spreadUsd.toFixed(2)}</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Roundtrip Fee</div>
                <div className="text-rose-400 font-bold">-${spreadSlippage.roundtripFeeUsd.toFixed(6)}</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Net Edge</div>
                <div className="text-emerald-400 font-bold">+${spreadSlippage.expectedNetEdgeUsd.toFixed(6)}</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {spreadSlippage.verdict}
            </p>
          </div>

          {/* =========================================================================
              PILLAR 8: MACHINE LEARNING CALIBRATED MODEL
             ========================================================================= */}
          <div
            onClick={() => setSelectedPillar(selectedPillar === 8 ? null : 8)}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              selectedPillar === 8
                ? 'bg-indigo-950/40 border-indigo-400 ring-1 ring-indigo-400'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-indigo-400" />
                8. ML Calibrated Probability
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {mlModel.calibratedUpProbability}% TARGET HIT
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Target Hit Prob</div>
                <div className="text-emerald-400 font-bold">{mlModel.targetFirstHitProbability}%</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Est. Time</div>
                <div className="text-cyan-400 font-bold">{mlModel.expectedTimeToTargetSec}s</div>
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                <div className="text-slate-500 text-[9px]">Confidence</div>
                <div className="text-indigo-300 font-bold">{mlModel.modelConfidence}%</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {mlModel.verdict}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
