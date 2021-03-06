var script = [{
  "keyword": "housing",
  "response": "Do you own your home or rent?",
  "children": [{
    "keyword": "own",
    "response": "Are you getting foreclosed on?",
    "children": [{
      "keyword": "yes",
      "response": "FORECLOSURE INFORMATION"
    }, {
      "keyword": "no",
      "response": "OWNS HOME, NO FORECLOSURE"
    }]
  }, {
    "keyword": "rent",
    "response": "Does the government pay a part or all of your rent?",
    "children": [{
      "keyword": "yes",
      "response": "SUBSIDIZED HOUSING INFORMATION"
    }, {
      "keyword": "no",
      "response": "Okay, let's figure out what's happening with your home. Are you being asked to leave your home?",
      "children": [{
        "keyword": "no",
        "response": "Is your landlord failing to make repairs?",
        "children": [{
          "keyword": "yes",
          "response": "CONDITIONS BRANCH"
        }, {
          "keyword": "no",
          "response": "Is your landlord discriminating against you?",
          "children": [{
            "keyword": "yes",
            "response": "DISCRIMINATION BRANCH"
          }, {
            "keyword": "no",
            "response": "DEAD END"
          }]
        }]
      }, {
        "keyword": "yes",
        "response": "Have you been asked to leave the premises?",
        "children": [{
          "keyword": "no",
          "response": "Is your landlord terminating your lease?",
          "children": [{
            "keyword": "yes",
            "response": "LEASE TERMINATION BRANCH"
          }, {
            "keyword": "no",
            "response": "DEAD END"
          }]

        }, {
          "keyword": "yes",
          "response": "Has your landlord seved you with a notice to leave the premises?",
          "children": [{
            "keyword": "no",
            "response": "A landlord must serve you with a notice to vacate the premises. The notice must ask you to leave the premises, state the reason why you are being asked to leave the premises and provide you with three (3) days to vacate the premises. A landlord cannot begin the eviction process until he serves you with a notice to vacate the premises."
          }, {
            "keyword": "yes",
            "response": "Were you served with court papers?",
            "children": [{
              "keyword": "no",
              "response": "After serving you with a notice to leave the premises, a landlord must file a complaint in the court where the landlord asks the court to order you to leave the premises. The complaint can be titled an 'eviction complaint' or a 'forcible entry and detainer action.' After a complaint is filed, the court will hold a hearing to determine whether the landlord has grounds to remove you from the premises. If the court determines that the landlord has legal grounds to remove you from the premises, a court will grant the landlord a 'write of restitution.' A 'writ of restitution' is an order making you leave the premises by a certain date. If you fail to leave the premises by a certain date, a landlord can remove your possessions and change the locks to the premises. A landlord cannot legally force you out of your home unless the landlord files a complaint with the court and the court determines that the landlord is entitled to a 'writ of restitution.'"
            }, {
              "keyword": "yes",
              "response": "Do you have a hearing scheduled?",
              "children": [{
                "keyword": "yes",
                "response": "You should attend the hearing. The hearing is your opportunity to tell your side of the story and present any defenses you have against your landlord's claims. If you fail to attend the hearing, a court may enter a judgment against you in favor of your landlord."
              }, {
                "keyword": "no",
                "response": "You should call the court to determine if a hearing has been scheduled. The court's contact information should be on the  cover of the court papers you received. You should attend the hearing. The hearing is your opportunity to tell your side of the story and present any defenses you have against your landlord's claims. If you fail to attend the hearing, a court may enter a judgment against you in favor of your landlord. "
              }]
            }]

          }]

        }]
      }]
    }]
  }]
}];
