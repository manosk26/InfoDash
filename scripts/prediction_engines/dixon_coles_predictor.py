# -*- coding: utf-8 -*-
"""
InfoDash AI Prediction Suite - Dixon-Coles Correct Score Predictor
Adjusts the Poisson model to better fit low-scoring draw distributions.
"""

import math
import argparse
import json

def poisson(k, lmbda):
    return (math.pow(lmbda, k) * math.exp(-lmbda)) / math.factorial(k)

def calculate_dixon_coles(lambda_h, lambda_a, rho=-0.08, max_goals=4):
    """Calculates probabilities with the Dixon-Coles rho (low-score dependency) adjustment."""
    matrix = {}
    for h in range(max_goals + 1):
        for a in range(max_goals + 1):
            prob = poisson(h, lambda_h) * poisson(a, lambda_a)
            # Dixon-Coles adjustment for low scores
            if h == 0 and a == 0:
                prob *= (1 - rho)
            elif h == 1 and a == 1:
                prob *= (1 - rho)
            elif h == 1 and a == 0:
                prob *= (1 + rho)
            elif h == 0 and a == 1:
                prob *= (1 + rho)
                
            matrix[f"{h}-{a}"] = round(prob * 100, 2)
    return matrix

def main():
    parser = argparse.ArgumentParser(description="Dixon-Coles Predictor")
    parser.add_argument("--home-xg", type=float, default=1.5)
    parser.add_argument("--away-xg", type=float, default=1.2)
    parser.add_argument("--rho", type=float, default=-0.08, help="Dependency parameter")
    parser.add_argument("--max-goals", type=int, default=4)
    args = parser.parse_args()

    results = calculate_dixon_coles(args.home_xg, args.away_xg, args.rho, args.max_goals)
    sorted_scores = sorted(results.items(), key=lambda x: x[1], reverse=True)

    output = {
        "parameters": {
            "home_xg": args.home_xg,
            "away_xg": args.away_xg,
            "rho": args.rho
        },
        "top_predictions": [{"score": k, "probability": f"{v}%"} for k, v in sorted_scores[:5]],
        "full_matrix": results
    }

    print(json.dumps(output, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    main()
