package example

import grails.gorm.services.Service

@Service(TrelloList)
interface TrelloListService {

    TrelloList get(Serializable id)

    List<TrelloList> list(Map args)

    Long count()

    TrelloList delete(Serializable id)

    TrelloList save(TrelloList trelloList)

}
