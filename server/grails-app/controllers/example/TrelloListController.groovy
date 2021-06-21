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
class TrelloListController {

    TrelloListService trelloListService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    /*def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond trelloListService.list(params), model:[trelloListCount: trelloListService.count()]
    }*/
    def index() { }

    def show(Long id) {
        respond trelloListService.get(id)
    }

    @Transactional
    def save(TrelloList trelloList) {
        if (trelloList == null) {
            render status: NOT_FOUND
            return
        }
        if (trelloList.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond trelloList.errors
            return
        }

        try {
            trelloListService.save(trelloList)
        } catch (ValidationException e) {
            respond trelloList.errors
            return
        }

        respond trelloList, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(TrelloList trelloList) {
        if (trelloList == null) {
            render status: NOT_FOUND
            return
        }
        if (trelloList.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond trelloList.errors
            return
        }

        try {
            trelloListService.save(trelloList)
        } catch (ValidationException e) {
            respond trelloList.errors
            return
        }

        respond trelloList, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || trelloListService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
