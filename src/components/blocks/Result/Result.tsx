import ResultClient from './Result.client';

export default function Result({ investItem, profitRate }: { investItem: string; profitRate: string }) {
	return <ResultClient investItem={investItem} profitRate={profitRate} />;
}
