package example

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class TrelloListServiceSpec extends Specification {

    TrelloListService trelloListService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new TrelloList(...).save(flush: true, failOnError: true)
        //new TrelloList(...).save(flush: true, failOnError: true)
        //TrelloList trelloList = new TrelloList(...).save(flush: true, failOnError: true)
        //new TrelloList(...).save(flush: true, failOnError: true)
        //new TrelloList(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //trelloList.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        trelloListService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<TrelloList> trelloListList = trelloListService.list(max: 2, offset: 2)

        then:
        trelloListList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        trelloListService.count() == 5
    }

    void "test delete"() {
        Long trelloListId = setupData()

        expect:
        trelloListService.count() == 5

        when:
        trelloListService.delete(trelloListId)
        datastore.currentSession.flush()

        then:
        trelloListService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        TrelloList trelloList = new TrelloList()
        trelloListService.save(trelloList)

        then:
        trelloList.id != null
    }
}
