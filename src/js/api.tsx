import data from '../assets/server-data.json';
import { InvestmentCategory, Portfolio } from '../redux/types';

export function useInvestmentCategories(): InvestmentCategory[] {
    return data.InvestmentCategories;
}

export function usePortfolios(): Portfolio[] {
    return data.Portfolios;
}