package example

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class TrelloCardController {

    TrelloCardService trelloCardService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond trelloCardService.list(params), model:[trelloCardCount: trelloCardService.count()]
    }

    def show(Long id) {
        respond trelloCardService.get(id)
    }

    @Transactional
    def save(TrelloCard trelloCard) {
        if (trelloCard == null) {
            render status: NOT_FOUND
            return
        }
        if (trelloCard.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond trelloCard.errors
            return
        }

        try {
            trelloCardService.save(trelloCard)
        } catch (ValidationException e) {
            respond trelloCard.errors
            return
        }

        respond trelloCard, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(TrelloCard trelloCard) {
        if (trelloCard == null) {
            render status: NOT_FOUND
            return
        }
        if (trelloCard.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond trelloCard.errors
            return
        }

        try {
            trelloCardService.save(trelloCard)
        } catch (ValidationException e) {
            respond trelloCard.errors
            return
        }

        respond trelloCard, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || trelloCardService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
