import { useMemo } from 'react';

import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

import { CHART_BG, CHART_PURPLE_LIGHT, CHART_BLUE_DARK, CHART_BLUE_LIGHT } from '../shared/constants';

interface WordCloudProps {
    width: number;
    height: number;
    data: string[];
}

export interface WordData {
    text: string;
    value: number;
}

// TODO: let users customize these colors as props
const colors = [CHART_BG, CHART_PURPLE_LIGHT, CHART_BLUE_DARK, CHART_BLUE_LIGHT];

// TODO: a better list
const wordsToIgnore = new Set(['a', 'to', 'the', 'and', 'or', 'but', 'at', 'in', 'an', 'of', 'by']);
/** Separate word strings into individual words by spaces, remove chars and useless words, and count how often words occur */
function wordFreq(words: string[]): WordData[] {
    const freqMap: Record<string, number> = words
        .flatMap((w) =>
            w
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .split(/\s/)
        )
        .reduce((acc, curr) => {
            if (wordsToIgnore.has(curr)) return acc;
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});

    return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
}

type SpiralType = 'archimedean' | 'rectangular';

export default function WordCloud({ width, height, data }: WordCloudProps) {
    const spiralType: SpiralType = 'rectangular';

    const words = useMemo(() => wordFreq(data), [data]);

    const fontScale = scaleLog({
        domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
        range: [10, 100]
    });
    const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

    return (
        <div className="wordcloud">
            <Wordcloud
                words={words}
                width={width}
                height={height}
                fontSize={fontSizeSetter}
                font={'Impact'}
                padding={2}
                spiral={spiralType}
                rotate={0}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => (
                        <Text
                            key={w.text}
                            fill={colors[i % colors.length]}
                            textAnchor={'middle'}
                            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                            fontSize={w.size}
                            fontFamily={w.font}
                        >
                            {w.text}
                        </Text>
                    ))
                }
            </Wordcloud>
            <style jsx>{`
                .wordcloud {
                    display: flex;
                    flex-direction: column;
                    user-select: none;
                }
                .wordcloud svg {
                    margin: 1rem 0;
                    cursor: pointer;
                }

                .wordcloud label {
                    display: inline-flex;
                    align-items: center;
                    font-size: 14px;
                    margin-right: 8px;
                }
                .wordcloud textarea {
                    min-height: 100px;
                }
            `}</style>
        </div>
    );
}
