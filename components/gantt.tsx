import { BarRounded } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleOrdinal } from '@visx/scale';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import {
    CHART_BG,
    CHART_BLUE_DARK,
    CHART_BLUE_LIGHT,
    CHART_PURPLE_DARK,
    CHART_PURPLE_LIGHT,
    CHART_PURPLE_MED,
    TOOLTIP_BG,
    TOOLTIP_COLOR
} from '../shared/constants';

export type AuthorData = {
    author: string;
    year: number;
    book: string;
};

type TooltipData = {
    bar: AuthorData;
    key: string;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    color: string;
};

export type BarStackHorizontalProps = {
    data: AuthorData[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};

export type AuthorProps = {
    fictionAuthors: AuthorData[];
    nonfictionAuthors: AuthorData[];
};

const defaultMargin = { top: 40, left: 200, right: 40, bottom: 60 };
const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: TOOLTIP_BG,
    color: TOOLTIP_COLOR
};

let tooltipTimeout: number;

const Gantt = withTooltip<BarStackHorizontalProps, TooltipData>(
    ({
        data,
        width,
        height,
        margin = defaultMargin,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    }: BarStackHorizontalProps & WithTooltipProvidedProps<TooltipData>) => {
        // bounds
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        // accessors
        const getAuthor = (d: AuthorData) => d.author;
        const getYear = (d: AuthorData) => d.year;

        // scales
        const yearScale = scaleBand<number>({
            domain: data.map(getYear).sort()
        });
        const authorScale = scaleBand<string>({
            domain: data.map(getAuthor),
            padding: 0.2
        });
        const colorScale = scaleOrdinal<string, string>({
            domain: data.map((d) => d.book) as string[],
            range: [CHART_PURPLE_DARK, CHART_PURPLE_LIGHT, CHART_PURPLE_MED]
        });

        yearScale.rangeRound([0, xMax]);
        authorScale.rangeRound([yMax, 0]);

        const bars = data.map((datum, index) => {
            const barHeight = authorScale.bandwidth();
            const barWidth = yearScale(2010) - yearScale(2009) - 2;
            const barX = yearScale(datum.year) + 1;
            const barY = authorScale(datum.author);
            return {
                key: `${datum.author}-${datum.year}`,
                index,
                bar: datum,
                height: barHeight,
                width: barWidth,
                x: barX || 0,
                y: barY || 0,
                color: colorScale(datum.book)
            };
        });

        return width < 10 ? null : (
            <div>
                <svg width={width} height={height}>
                    <rect width={width} height={height} fill={CHART_BG} rx={14} />
                    <Group top={margin.top} left={margin.left}>
                        {bars.map((bar, i) => (
                            <BarRounded
                                key={i}
                                width={bar.width}
                                height={bar.height}
                                x={bar.x}
                                y={bar.y}
                                fill={bar.color}
                                radius={3}
                                all={true}
                                onMouseLeave={() => {
                                    tooltipTimeout = window.setTimeout(() => {
                                        hideTooltip();
                                    }, 300);
                                }}
                                onMouseMove={() => {
                                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                                    const top = bar.y + margin.top;
                                    const left = bar.x + bar.width + margin.left;
                                    showTooltip({
                                        tooltipData: bar,
                                        tooltipTop: top,
                                        tooltipLeft: left
                                    });
                                }}
                            />
                        ))}
                        <AxisLeft
                            scale={authorScale}
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
                            scale={yearScale}
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
                {tooltipOpen && tooltipData && (
                    <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                        <div style={{ color: colorScale(tooltipData.bar.book) }}>
                            <strong>{tooltipData.bar.author}</strong>
                        </div>
                        <div>{tooltipData.bar.year}</div>
                        <small>
                            <div>{tooltipData.bar.book}</div>
                        </small>
                    </Tooltip>
                )}
            </div>
        );
    }
);

export default Gantt;
