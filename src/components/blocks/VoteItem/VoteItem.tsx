import VoteItemClient from './VoteItem.client';

interface VoteItemProps {

	onVote?: (vote: { type: string; amount: number }) => void;
}

export default function VoteItem(props: VoteItemProps) {
	return <VoteItemClient {...props} />;
}
