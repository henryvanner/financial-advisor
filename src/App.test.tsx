import store from './redux/store';
import { setRiskPreference } from './redux/actions';
import { EffectiveAllocation, Portfolio, Transaction } from './redux/types';
import { balancePortfolio } from './js/helpers';

const currentPortfolio: EffectiveAllocation[] = [
	{ investmentCategory: "1", amount: 20 },
	{ investmentCategory: "2", amount: 25 },
	{ investmentCategory: "3", amount: 35 },
	{ investmentCategory: "4", amount: 8 },
	{ investmentCategory: "5", amount: 12 },
];
const targetPortfolio: Portfolio = {
	riskLevel: 5,
	allocations: [
		{ investmentCategory: "1", proportion: 40 },
		{ investmentCategory: "2", proportion: 20 },
		{ investmentCategory: "3", proportion: 20 },
		{ investmentCategory: "4", proportion: 20 },
		{ investmentCategory: "5", proportion: 0 },
	]
};

test('set risk preference', () => {
	store.dispatch(setRiskPreference(1));
	expect(store.getState().riskPreference).toBe(1);
});

test('balance portfolio', () => {
	const expectedNewPortfolio: EffectiveAllocation[] = [
		{ investmentCategory: "1", amount: 40 },
		{ investmentCategory: "2", amount: 20 },
		{ investmentCategory: "3", amount: 20 },
		{ investmentCategory: "4", amount: 20 },
		{ investmentCategory: "5", amount: 0 },
	];

	const expectedTransactions: Transaction[] = [
		{ from: "3", to: "1", amount: 15 },
		{ from: "5", to: "4", amount: 12 },
		{ from: "2", to: "1", amount: 5 }
	];

	const [newPortfolio, transactions] = balancePortfolio(currentPortfolio, targetPortfolio);
	expect(newPortfolio).toEqual(expectedNewPortfolio);
	expect(transactions).toEqual(expectedTransactions);
});