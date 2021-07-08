package example

import grails.rest.Resource

@Resource(uri = '/trellolist')

class TrelloList {
    String title;
    int id;

    static hasMany = [card: TrelloCard];

    static constraints = {
        //id size: 1..10, blank: false;
        //title size: 1..40, blank: false;
    }

    String toString(){
        //id;
        //title;
    }
}
