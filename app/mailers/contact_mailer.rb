class ContactMailer < ActionMailer::Base
    default to: 'brennan.l.olson@gmail.com'
    #default to: 'Brennan.Olson@drillingtools.com'

    def contact_email(name, email, body)
        delivery_method = :smtp
        @name = name
        @email = email
        @body = body

        mail(from: email, subject: 'Contact Form Message')
    end
end
