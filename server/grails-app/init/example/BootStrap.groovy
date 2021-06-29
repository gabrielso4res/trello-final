package example

import example.TrelloList
import example.TrelloCard

class BootStrap {

    def init = { servletContext ->
        log.info "Loading database...";
        def list1 = new TrelloList("id": "0", title: "lista1").save();
        //def list2 = new TrelloList(id: "1", title: "lista2").save();

        //list1.addToCard(new TrelloCard(id: "0", text: "Card1", lista: list1).save())
        //list1.addToCard(new TrelloCard(id: "1", text: "Card2", lista: list1).save())
        /*list2.addToCard(new TrelloCard(id: "2", text: "Card3", lista: list2).save())
        list2.addToCard(new TrelloCard(id: "3", text: "Card4", lista: list2).save())*/

    }
    def destroy = {
    }
}
