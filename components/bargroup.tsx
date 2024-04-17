import React from 'react';

import { BarGroup } from '@visx/shape';
import { Group } from '@visx/group';
import { Grid } from '@visx/grid';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';

import {
    CHART_BG,
    CHART_PURPLE_DARK,
    CHART_PURPLE_LIGHT,
    CHART_PURPLE_MED,
    TOOLTIP_BG,
    TOOLTIP_COLOR
} from '../shared/constants';

type TooltipData = {
    key: string;
    value: number;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
};

interface Data {
    date: string;
}

export type VerticalBarGroupProps<T extends Data> = {
    data: T[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};

// TODO: allow users to customize these as props
const defaultMargin = { top: 60, right: 40, bottom: 60, left: 60 };
const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: TOOLTIP_BG,
    color: TOOLTIP_COLOR
};
const legendGlyphSize = 15;

let tooltipTimeout: number;

export default function VerticalBarGroup<T extends Data>({
    data,
    width,
    height,
    margin = defaultMargin
}: VerticalBarGroupProps<T>) {
    const getDate = (d: T) => d.date;
    const dateDomain = data.map(getDate);
    const groupDomain = Object.keys(data[0]).filter((d) => d !== 'date');

    // scales
    const dateScale = scaleBand<string>({
        domain: dateDomain,
        padding: 0.2
    });
    const groupScale = scaleBand<string>({
        domain: groupDomain,
        padding: 0.1
    });
    const countScale = scaleLinear<number>({
        domain: [0, Math.max(...data.map((d) => Math.max(...groupDomain.map((key) => Number(d[key])))))],
        nice: true
    });
    const colorScale = scaleOrdinal<string, string>({
        domain: groupDomain,
        range: [CHART_PURPLE_DARK, CHART_PURPLE_LIGHT, CHART_PURPLE_MED]
    });

    const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip<TooltipData>();

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        scroll: true
    });

    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    dateScale.rangeRound([0, xMax]);
    groupScale.rangeRound([0, dateScale.bandwidth()]);
    countScale.range([yMax, 0]);

    return width < 10 ? null : (
        <div style={{ position: 'relative' }}>
            <svg ref={containerRef} width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill={CHART_BG} rx={14} />
                <Grid
                    top={margin.top}
                    left={margin.left}
                    xScale={dateScale}
                    yScale={countScale}
                    width={xMax}
                    height={yMax}
                    stroke="black"
                    strokeOpacity={0.1}
                    xOffset={dateScale.bandwidth() / 2}
                />
                <Group top={margin.top} left={margin.left}>
                    <BarGroup
                        data={data}
                        keys={groupDomain}
                        height={yMax}
                        x0={getDate}
                        x0Scale={dateScale}
                        x1Scale={groupScale}
                        yScale={countScale}
                        color={colorScale}
                    >
                        {(barGroups) =>
                            barGroups.map((barGroup) => (
                                <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                                    {barGroup.bars.map((bar) => (
                                        <rect
                                            key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            fill={bar.color}
                                            rx={4}
                                            onMouseLeave={() => {
                                                tooltipTimeout = window.setTimeout(() => {
                                                    hideTooltip();
                                                }, 300);
                                            }}
                                            onMouseMove={(event) => {
                                                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                                                // TooltipInPortal expects coordinates to be relative to containerRef
                                                // localPoint returns coordinates relative to the nearest SVG, which
                                                // is what containerRef is set to in this example.
                                                const eventSvgCoords = localPoint(event);
                                                const left = barGroup.x0 + bar.x + bar.width / 2;
                                                showTooltip({
                                                    tooltipData: bar,
                                                    tooltipTop: eventSvgCoords?.y,
                                                    tooltipLeft: left
                                                });
                                            }}
                                        />
                                    ))}
                                </Group>
                            ))
                        }
                    </BarGroup>
                    <AxisLeft
                        scale={countScale}
                        stroke={CHART_PURPLE_MED}
                        tickStroke={CHART_PURPLE_MED}
                        tickLabelProps={{
                            fill: CHART_PURPLE_MED,
                            fontSize: 11,
                            textAnchor: 'end',
                            dy: '0.33em'
                        }}
                    />
                    <AxisBottom
                        top={yMax}
                        scale={dateScale}
                        stroke={CHART_PURPLE_MED}
                        tickStroke={CHART_PURPLE_MED}
                        tickLabelProps={{
                            fill: CHART_PURPLE_MED,
                            fontSize: 11,
                            textAnchor: 'middle'
                        }}
                    />
                </Group>
            </svg>
            <div
                style={{
                    position: 'absolute',
                    top: margin.top / 2 - 10,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '14px'
                }}
            >
                <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0">
                    {(labels) => (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {labels.map((label, i) => (
                                <LegendItem key={`legend-quantile-${i}`} margin="0 5px">
                                    <svg width={legendGlyphSize} height={legendGlyphSize}>
                                        <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
                                    </svg>
                                    <LegendLabel align="left" margin="0 0 0 4px">
                                        <span style={{ color: colorScale(label.text) }}>{label.text}</span>
                                    </LegendLabel>
                                </LegendItem>
                            ))}
                        </div>
                    )}
                </LegendOrdinal>
            </div>

            {tooltipOpen && tooltipData && (
                <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                    <div style={{ color: colorScale(tooltipData.key) }}>
                        <strong>{tooltipData.key}</strong>
                    </div>
                    <div>{tooltipData.value}</div>
                </TooltipInPortal>
            )}
        </div>
    );
}
