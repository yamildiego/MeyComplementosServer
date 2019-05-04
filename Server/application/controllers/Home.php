<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require_once 'assets/libMP/mercadopago.php';

class Home extends REST_Controller
{
    public $mp = null;

    public function __construct()
    {
        parent::__construct();
        $this->mp = new MP("317986483567299", "Xj0ssbWWe211GwqHH2dNnGqWp9jXLaTc");
    }

    public function generateLinkMP_post()
    {
        $data = array('status' => false);

        $items = (int) $this->post('totalItems');
        $price = (int) $this->post('total');

        if ($price != null && $price != 0) {
            $data['status'] = true;
            $preference_data = array(
                "items" => array(
                    array(
                        "title" => "Compra Mey Complementos por " . $items . " items",
                        "quantity" => 1,
                        "currency_id" => "ARS",
                        "unit_price" => $price,
                    ),
                ),
                "back_urls" => array(
                    "success" => "http://localhost:9000/success",
                    "failure" => "http://localhost:9000/failure",
                    "pending" => "http://localhost:9000/pending",
                ),
            );
            $preference = $this->mp->create_preference($preference_data);
            $data['data'] = $preference['response']['init_point'];
        }

        $this->response($data, REST_Controller::HTTP_OK); // OK (200)
    }

    public function contact_post()
    {
        $obj = (object) array('name' => $this->post('name'), 'email' => $this->post('email'), 'message' => $this->post('message'));

        $errors = array();

        if ($obj->name == '' || $obj->name == null || $obj->email == '' ||
            $obj->email == null || !filter_var($obj->email, FILTER_VALIDATE_EMAIL) ||
            $obj->message == '' || $obj->message == null) {
            $data = array('status' => true, 'errors' => true);
            $this->response($data, REST_Controller::HTTP_FOUND); // FOUND (302)
        } else {
            $mensaje = $this->load->view('email_contact_view', array('obj' => $obj), true);
            $status_email = true;
            // $status_email = $this->_send_email('info@unallama.com.ar', 'yamildiego@gmail.com', $mensaje, 'Consulta desde la Web: ' . 'Consulta WEB Unallama');

            if ($status_email) {
                $data = array('status' => true);
                $this->response($data, REST_Controller::HTTP_OK); // OK (200)
            } else {
                $this->response(array('status' => false), REST_Controller::HTTP_FOUND); // FOUND (302)
            }
        }
    }

    private function _send_email($p_email_from, $p_email_to, $p_message, $p_subject)
    {
        $p_email_from = 'info@unallama.com.ar';
        $this->load->library('email');
        $this->email->initialize();
        $this->email->from($p_email_from, 'Unallama');
        $this->email->to($p_email_to);
        $this->email->subject($p_subject);
        $this->email->message($p_message);
        $a = $this->email->send();

        if (!$a) {
            echo $this->email->print_debugger();
        }
        return $a;
    }
}
