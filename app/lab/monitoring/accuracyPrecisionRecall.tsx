// components/AccuracyPrecisionRecall.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import './style.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
}

interface MetricData {
    labels: number[];
    datasets: Dataset[];
}

interface DummyData {
    accuracy: MetricData;
    precision: MetricData;
    recall: MetricData;
}

const dummyData: DummyData = {
    accuracy: {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [
            { label: 'AdaBoost', data: [65, 70, 75, 80, 85, 90, 92, 94, 95, 96], borderColor: 'blue', fill: false },
            { label: 'ANN', data: [68, 72, 76, 82, 87, 91, 94, 96, 97, 98], borderColor: 'orange', fill: false },
            { label: 'GBoost', data: [70, 74, 78, 84, 89, 93, 96, 97, 98, 99], borderColor: 'green', fill: false },
            { label: 'KNN', data: [66, 71, 76, 81, 86, 90, 93, 95, 96, 97], borderColor: 'purple', fill: false },
            { label: 'SVM', data: [67, 73, 77, 83, 88, 92, 95, 96, 97, 98], borderColor: 'red', fill: false },
        ],
    },
    precision: {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [
            { label: 'AdaBoost', data: [60, 65, 70, 75, 80, 85, 88, 90, 92, 93], borderColor: 'blue', fill: false },
            { label: 'ANN', data: [63, 68, 73, 78, 83, 88, 91, 93, 94, 95], borderColor: 'orange', fill: false },
            { label: 'GBoost', data: [65, 70, 75, 80, 85, 90, 93, 94, 95, 96], borderColor: 'green', fill: false },
            { label: 'KNN', data: [61, 66, 71, 76, 81, 85, 88, 90, 91, 92], borderColor: 'purple', fill: false },
            { label: 'SVM', data: [62, 67, 72, 77, 82, 87, 90, 91, 92, 93], borderColor: 'red', fill: false },
        ],
    },
    recall: {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [
            { label: 'AdaBoost', data: [58, 63, 68, 73, 78, 83, 86, 88, 90, 91], borderColor: 'blue', fill: false },
            { label: 'ANN', data: [61, 66, 71, 76, 81, 86, 89, 91, 92, 93], borderColor: 'orange', fill: false },
            { label: 'GBoost', data: [63, 68, 73, 78, 83, 88, 91, 92, 93, 94], borderColor: 'green', fill: false },
            { label: 'KNN', data: [59, 64, 69, 74, 79, 83, 86, 88, 89, 90], borderColor: 'purple', fill: false },
            { label: 'SVM', data: [60, 65, 70, 75, 80, 85, 88, 89, 90, 91], borderColor: 'red', fill: false },
        ],
    },
};

interface AccuracyPrecisionRecallProps {
    selectedMetric: keyof DummyData;
}

const AccuracyPrecisionRecall: React.FC<AccuracyPrecisionRecallProps> = ({ selectedMetric }) => {
    return (
        <div className="chart-container">
            <Line data={dummyData[selectedMetric]} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default AccuracyPrecisionRecall;
