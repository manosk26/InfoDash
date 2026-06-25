# -*- coding: utf-8 -*-
"""
InfoDash AI Prediction Suite - Poisson Correct Score Engine
Implements the exact Poisson probability calculation for soccer scorelines.
"""

import math
import argparse
import json

def poisson(k, lmbda):
    """Calculates Poisson probability for k goals with mean expectancy lambda."""
    return (math.pow(lmbda, k) * math.exp(-lmbda)) / math.factorial(k)

def calculate_score_matrix(lambda_home, lambda_away, max_goals=5):
    """Generates a matrix of probabilities for all correct scores up to max_goals."""
    matrix = {}
    for h in range(max_goals + 1):
        for a in range(max_goals + 1):
            prob = poisson(h, lambda_home) * poisson(a, lambda_away)
            matrix[f"{h}-{a}"] = round(prob * 100, 2)
    return matrix

def main():
    parser = argparse.ArgumentParser(description="Poisson Correct Score Calculator")
    parser.add_argument("--home-xg", type=float, default=1.5, help="Expected goals for home team")
    parser.add_argument("--away-xg", type=float, default=1.2, help="Expected goals for away team")
    parser.add_argument("--max-goals", type=int, default=4, help="Max goals to calculate per team")
    args = parser.parse_args()

    results = calculate_score_matrix(args.home_xg, args.away_xg, args.max_goals)
    
    # Sort scores by probability descending
    sorted_scores = sorted(results.items(), key=lambda x: x[1], reverse=True)
    
    output = {
        "parameters": {
            "home_xg": args.home_xg,
            "away_xg": args.away_xg
        },
        "top_predictions": [{"score": k, "probability": f"{v}%"} for k, v in sorted_scores[:5]],
        "full_matrix": results
    }
    
    print(json.dumps(output, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    main()
