      <?php if ($_POST) : 

        foreach ($_POST as $key => $value) :
          echo $key . ' | ' . $value . '<br>';
        endforeach;

      ?>

      <p>Thank you for submitting your form!</p>

      <?php endif; ?>

