package example

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class TrelloCardServiceSpec extends Specification {

    TrelloCardService trelloCardService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new TrelloCard(...).save(flush: true, failOnError: true)
        //new TrelloCard(...).save(flush: true, failOnError: true)
        //TrelloCard trelloCard = new TrelloCard(...).save(flush: true, failOnError: true)
        //new TrelloCard(...).save(flush: true, failOnError: true)
        //new TrelloCard(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //trelloCard.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        trelloCardService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<TrelloCard> trelloCardList = trelloCardService.list(max: 2, offset: 2)

        then:
        trelloCardList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        trelloCardService.count() == 5
    }

    void "test delete"() {
        Long trelloCardId = setupData()

        expect:
        trelloCardService.count() == 5

        when:
        trelloCardService.delete(trelloCardId)
        datastore.currentSession.flush()

        then:
        trelloCardService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        TrelloCard trelloCard = new TrelloCard()
        trelloCardService.save(trelloCard)

        then:
        trelloCard.id != null
    }
}
