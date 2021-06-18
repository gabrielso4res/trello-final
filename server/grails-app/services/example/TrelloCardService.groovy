package example

import grails.gorm.services.Service

@Service(TrelloCard)
interface TrelloCardService {

    TrelloCard get(Serializable id)

    List<TrelloCard> list(Map args)

    Long count()

    TrelloCard delete(Serializable id)

    TrelloCard save(TrelloCard trelloCard)

}
