package example

import grails.rest.Resource

@Resource(uri = '/trellocard')

class TrelloCard {
    int id;
    String text;

    static belongsTo = [lista: TrelloList];

    static constraints = {
        //id size: 1..10, blank: false;
        //text size: 1..40, blank: false;
    }

    String toString(){
        //id;
        //text;
    }
}
