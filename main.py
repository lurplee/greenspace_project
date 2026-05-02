def rate_greenspace(access, equity, nature, community, features):

    access_wgt = access*0.2414
    equity_wgt = equity*0.2336
    nature_wgt = nature*0.1857
    community_wgt =community*0.1872
    features_wgt = features*0.1736

    score_breakdown ={
        "accessibility": access_wgt,
        "equity": equity_wgt,
        "nature": nature_wgt,
        "community": community_wgt,
        "features": features_wgt,
        "score": round((access_wgt+equity_wgt+nature_wgt+community_wgt+features_wgt),2)
    }

    return score_breakdown


def rating_category(score):
    if score >= 4.5:
        category = "Great"
    elif score >=4:
        category = "Fair"

    elif score >= 3:
        category = "Okay"

    elif score >=2:
        category = "Poor"

    else:
        category = "Extremely Poor"
    
    return category
    

