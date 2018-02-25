script = [{
  "keyword": "Housing",
  "response": "Does your client rent or own?",
  "children": [{
    "keyword": "rent",
    "response": "Does your client live in subsidized or private landlord-tenant housing?",
    "children": [{
      "keyword": "private landlord-tenant housing",
      "response": "Does your client have a problem with access to housing, lease termination, eviction, conditions, discrimination or other?",
      "children": [{
        "keyword": "eviction",
        "response": "The following statutes may be applicable to your client's issue: O.R.C. Chapter 4781 - Manufactured Homes, O.R.C. Chapter 5321 - Landlords and Tenants, O.R.C. Chapter 1923 - Forcible Entry and Detainer. Has the client been served with papers?",
        "children": [{
          "keyword": "yes",
          "response": "Review the complaint. Ensure you have the proper plaintiff (the person bringing the complaint owns the property/land) and that the landlord served a 3 day notice (R.C. 1923). If no 3 day notice has been served, the court lacks jurisdiction and the complaint will be dismissed. Does your client want to leave or stay in the premises?",
          "children": [{
            "keyword": "stay",
            "response": "Does the client dispute that s/he owes the landlord rent?",
            "children": [{
              "keyword": "No",
              "response": "A landlord has the right to evict a tenant for nonpayment of rent. Does the client have funds to offer toward settlement or a repayment agreement?",
              "children": [{
                "keyword": "yes",
                "response": "Encourage the client to negotiate a settlement (or offer to do it for him/her). If needed, refer the client to seek immediate cash assistance to help pay for the settlement from the following social agencies: Salvation Army, Catholic Charities, Department of Job and Family Services."
              }]
            }]
          }]
        }]
      }]
    }]
  }]

}]
