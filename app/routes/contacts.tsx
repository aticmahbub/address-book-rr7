import {Form} from 'react-router';
import {getContact} from '../data';
import type {Route} from './+types/contacts';

export async function loader({params}: Route.LoaderArgs) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response('Not Found', {status: 404});
    }
    return {contact};
}

export default function contacts({loaderData}: Route.ComponentProps) {
    const {contact} = loaderData;
    console.log(contact);
    return (
        <div id='contact'>
            <div>
                <img
                    alt={`${contact.first} ${contact.last} avatar`}
                    key={contact.avatar}
                    src={contact.avatar}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}
                    {/* <Favorite contact={contact} /> */}
                </h1>

                {contact.twitter ? (
                    <p>
                        <a href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>
                ) : null}

                {contact.notes ? <p>{contact.notes}</p> : null}

                <div>
                    <Form action='edit'>
                        <button type='submit'>Edit</button>
                    </Form>

                    <Form
                        action='destroy'
                        method='post'
                        onSubmit={(event) => {
                            const response = confirm(
                                'Please confirm you want to delete this record.',
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type='submit'>Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
